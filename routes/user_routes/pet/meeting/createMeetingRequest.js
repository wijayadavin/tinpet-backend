const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const routeErrorHandler = require('../../../../middleware/errorHandler')
const Controller = require('../../../../controller/dbController')


// mengirim meeting baru berdasarkan id pet penerima request (petId), dengan status requested:
router.post('/pet/meeting', // --> menghasilkan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // body.recipientUserId = ambil data userId pada table 'pets' dengan { id: req.body.petId }
            const foundRecipientPet = await new Controller('pets').get({ id: req.body.petId })
            delete req.body.petId

            // merge body and hour:
            req.body.time = await req.body.date + "T" + req.body.hour
            delete req.body.date
            delete req.body.hour

            // define senderUserId:
            req.body.recipientId = req.user.id

            // create data baru di table meetings
            const result1 = await new Controller('petMeetings').add(req.body)

            const senderNotif = {
                userId: req.user.id,
                text: "Your meeting request has been sent",
                url: `/pet-meeting/${result1.id}`,
            }

            const recipientNotif = {
                userId: foundRecipientPet.userId,
                text: "You received a new meeting request",
                url: `/pet-meeting/${result1.id}`,
            }

            // kirim notification ke kedua belah pihak:
            const result2 = await new Controller('userNotifications').add(senderNotif)
            const result3 = await new Controller('userNotifications').add(recipientNotif)

            // kalau berhasil, jalankan res.send(result 1, 2 dan 3 digabung jadi 1):
            res.send([
                result1,
                result2,
                result3
            ])
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router