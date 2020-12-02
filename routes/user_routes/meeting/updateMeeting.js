const bodyParser = require('body-parser')
const express = require('express')
const { addListener } = require('process')
const nodemailerConfig = require('../../../configs/nodemailerConfig')
const Controller = require('../../../controller/dbController')
const router = express.Router()
const auth = require('../../../middleware/auth')
const routeErrorHandler = require('../../../middleware/errorHandler')


// mengedit meeting berdasarkan meeting id (meetingId):
router.post('/meeting/:meetingId', // --> menghasilkan req.params.meetingId dan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // foundMeeting = get meeting by req.params.meetingId

            const result1 = await new Controller('meetings').edit(req.params.meetingId, req.body)

            // siapkan data notif untuk sender user:
            const senderNotif = {
                userId: req.user.id,
                text: `Your meeting request status had changed to ${result1.status}`,
                url: `${process.env.BASE_URL}/pet-meeting/${req.params.meetingId}`,
            }

            // siapkan data notif untuk recipient user:
            const recipientNotif = {
                userId: foundRecipientPet.userId,
                text: `You have changed a meeting request status to ${req.result1.status}`,
                url: senderNotif.url,
            }

            // kirim notification ke kedua belah pihak:
            const result2 = await new Controller('userNotifications').add(senderNotif)
            const result3 = await new Controller('userNotifications').add(recipientNotif)


            // data yang akan dipakai dalam pengiriman email untuk result 4:
            const foundRecipientUser = await new Controller('users').get({ id: foundRecipientPet.userId })

            const mailOptions = {
                from: '"TinPet" <cs.wijayadavin@gmail.com>',
                to: foundRecipientUser.email,
                subject: `🐱 Your meeting request had changed to ${result1.status}!`,
                html: `
                <h1>
                   Howdy ${foundRecipientUser.name}! Your meeting request status had changed to ${result1.status}.
                </h1>
                <h3>
                    Please go to this <a href="${recipientNotif.url}">link</a> to respond the request:
                </h3>
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