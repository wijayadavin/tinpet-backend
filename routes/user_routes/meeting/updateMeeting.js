const bodyParser = require('body-parser')
const express = require('express')
const { addListener } = require('process')
const nodemailerConfig = require('../../../config/nodemailerConfig')
const Controller = require('../../../controller/dbController')
const UserController = require('../../../controller/userController')
const chatSenderHelper = require('../../../helper/chatSenderHelper')
const CustomError = require('../../../helper/customErrorHelper')
const router = express.Router()
const auth = require('../../../middleware/auth')
const routeErrorHandler = require('../../../middleware/errorHandler')


// mengedit meeting berdasarkan meeting id (meetingId):
router.patch('/meeting/:meetingId', // --> menghasilkan req.params.meetingId dan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // foundMeeting = get meeting by req.params.meetingId
            const result1 = await new Controller('meetings').edit(req.params.meetingId, req.body)

            // cari data recipient dan sender user berdasarkan result1.recipientUserId
            const foundRecipientUser = await new UserController().getUserDataAndUserImage(result1.recipientUserId)
            const foundSenderUser = await new UserController().getUserDataAndUserImage(req.user.id)

            // siapkan data notif untuk sender user:
            const senderNotif = {
                userId: req.user.id,
                imageUrl: foundRecipientUser.imageUrl.url,
                text: `You had successfully changed the status of your meeting request with ${foundRecipientUser.name} to ${result1.status}`,
                url: `${process.env.BASE_URL}/meeting/${req.params.meetingId}`,
            }

            // siapkan data notif untuk recipient user:
            const recipientNotif = {
                userId: result1.recipientUserId,
                imageUrl: foundSenderUser.imageUrl.url,
                text: `${foundSenderUser.name} had changed your meeting request status to ${result1.status}`,
                url: senderNotif.url,
            }

            // kirim notification ke kedua belah pihak:
            const result2 = await new Controller('userNotifications').add(senderNotif)
            const result3 = await new Controller('userNotifications').add(recipientNotif)

            // proses pengiriman chat
            let result4
            if (req.user.id === result1.recipientUserId) {
                // apabila user (token) adalah penerima meeting request:
                result4 = await chatSenderHelper(req.user.id, result1.senderUserId, req.body.text)
            }
            else if (req.user.id === result1.senderUserId) {
                // apabila user (token) adalah pengirim meeting request:
                result4 = await chatSenderHelper(req.user.id, result1.recipientUserId, req.body.text)
            }
            else {
                // apabila token tidak cocok:
                return next(new CustomError(
                    403,
                    "ER_FORBIDDEN",
                    "Forbidden error",
                    "the meeting id and user token does not match"
                ))
            }

            // data yang akan dipakai dalam pengiriman email untuk result 4:
            const mailOptions = {
                from: '"TinPet" <cs.wijayadavin@gmail.com>',
                to: foundRecipientUser.email,
                subject: `🐱 Your meeting request had changed to ${result1.status}.`,
                html: `
                <h1>
                   Howdy ${foundRecipientUser.name}! Your meeting request status had changed to ${result1.status}.
                </h1>
                `
            }

            // result 4, mengirimkan notifikasi email:
            const result5 = await nodemailerConfig.sendMail(mailOptions)
                .catch(err => { next(err) })


            // kalau berhasil, jalankan res.send(result 1 dan 2 digabung jadi 1)
            res.send({
                meeting: result1,
                senderNotif: result2,
                recipientNotif: result3,
                chatLine: result4,
                recipientEmailNotif: {
                    messageSent: result5.messageId,
                    ...mailOptions
                }
            })
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router