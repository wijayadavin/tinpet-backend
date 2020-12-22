const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')
const routeErrorHandler = require('../../../middleware/errorHandler')
const Controller = require('../../../controller/dbController')
const nodemailerConfig = require('../../../config/nodemailerConfig')
const CustomError = require('../../../helper/customErrorHelper')
const chatSenderHelper = require('../../../helper/chatSenderHelper')
const UserController = require('../../../controller/userController')


// mengirim meeting baru berdasarkan id pet penerima request (recipientPetId), dengan status requested:
router.post(['/meeting', '/pet/:recipientPetId/meeting'], // --> menghasilkan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // apabila menggunakan path parameter, maka masukan data tersebut ke body sebagai recipient (penerima):
            if (req.params.recipientPetId) {
                req.body.recipientPetId = req.params.recipientPetId
            }

            // merge body & hour ke dalam body dengan key 'time':
            req.body.time = await req.body.date + "T" + req.body.hour
            delete req.body.date
            delete req.body.hour

            // masukan UserId pengirim (sender) ke body:
            req.body.senderUserId = req.user.id

            // jika tidak ada data sender pet, maka ambil salah satu pet milik sender user:
            if (!req.body.senderPetId) {
                const foundSenderPet = await new Controller('pets').get({ userId: req.user.id })
                if (!foundSenderPet) {
                    next(new CustomError(
                        404,
                        "ER_SENDER_PET_NOT_FOUND",
                        "Error not found",
                        "The sender's pet was not found, please create a pet first"
                    ))
                }
                req.body.senderPetId = foundSenderPet.id
            }

            // cari data recipient pet (penerima):
            const foundRecipientPet = await new Controller('pets').get({ id: req.body.recipientPetId })
            if (!foundRecipientPet) {
                next(new CustomError(404, "ER_NOT_FOUND", "Not found", "Pet id was not found"))
            }
            // masukan recipient user id ke dalam body:
            req.body.recipientUserId = foundRecipientPet.userId

            // create data baru di table meetings:
            const result1 = await new Controller('meetings').add(req.body)

            // cari data sender dan recipient user:
            const foundSenderUser = await new UserController().getUserDataAndUserImage(req.user.id)
            const foundRecipientUser = await new UserController().getUserDataAndUserImage(foundRecipientPet.userId)

            // siapkan data notif untuk sender user:
            const senderNotif = {
                userId: req.user.id,
                imageUrl: foundRecipientUser.userImage.url,
                text: `Your meeting request has been sent to ${foundRecipientUser.name}`,
                url: `${process.env.BASE_URL}/meeting/${result1.id}`,
            }

            // siapkan data notif untuk recipient user:
            const recipientNotif = {
                userId: foundRecipientPet.userId,
                imageUrl: foundSenderUser.userImage.url,
                text: `${foundSenderUser.name} sent a meeting request to you`,
                url: senderNotif.url,
            }

            // kirim notification ke kedua belah pihak:
            const result2 = await new Controller('userNotifications').add(senderNotif)
            const result3 = await new Controller('userNotifications').add(recipientNotif)


            // kirim chat ke penerima meeting request:
            const result4 = await chatSenderHelper(req.user.id, foundRecipientPet.userId, req.body.text)


            // data yang akan dipakai dalam pengiriman email untuk result 4:
            const mailOptions = {
                from: '"TinPet" <cs.wijayadavin@gmail.com>',
                to: foundRecipientUser.email,
                subject: '🐱 You received a new meeting request in TinPet!',
                html: `
<head>
    <style>
        .style {
            text-align: center;
        }
    </style>
</head>
<body text-align: center>
    <div class=style>
    <a href="https://www.tinpet.my.id">
        <img src=http://api.tinpet.my.id/file/new-meeting-notif.jpg></img>
        </a>
        <h2>Howdy ${foundRecipientUser.name}!</h2>
        Your pet named ${foundRecipientPet.name} had received a meeting request!
    </div>
</body>
                `
            }
            // result 4, mengirimkan notifikasi email:
            const result5 = await nodemailerConfig.sendMail(mailOptions)
                .catch(err => {
                    console.log(`failed to send email from ${process.env.EMAIL} to ${foundRecipientUser.email}`)
                    console.log(err)
                })


            // Jalankan res.send(result 1, 2, 3, dan 4 digabung jadi 1):
            res.send({
                meeting: result1,
                senderNotif: result2,
                recipientNotif: result3,
                chatLine: result4,
                recipientEmailNotif: result5 ? {
                    messageSent: result5.messageId,
                    ...mailOptions
                } : null
            })
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router