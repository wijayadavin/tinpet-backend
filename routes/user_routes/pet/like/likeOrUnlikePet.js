const express = require('express')
const Controller = require('../../../../controller/dbController')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const routeErrorHandler = require('../../../../middleware/errorHandler')


// mengirim like atau unlike berdasarkan id pet penerima request (petId):
router.post('/pet/:petId/like', // --> menghasilkan req.params.petId
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            /**
             * kumpulkan data ke variable body:
             * let body = {}
             * body.senderUserId = req.user.id
             * foundRecipientUserId = ambil data userId pada table 'pets' dengan { id: req.params.petId }
             */

            req.body.userId = req.user.id
            let body = {}
            body.senderUserId = req.user.id
            const foundRecipientUserId = await new Controller('pets')
                .get({ id: req.params.petId })


            /**
             * ekspektasi data body seperti ini:
             * {
             *      userId: req.user.id
             *      petId: req.params.petId
             * }
             */



            /**
             * result1 = tambah atau delete like dengan data body
             * result2 = kirim notification ke sender ({ id: req.user.id })
             * result3 = kirim notification ke recipient ({ id: foundRecipientUserId })
             */
            const result1 = await new Controller('petsLike').add(req.body)

            const senderNotif = {
                userId: req.user.id,
                text: "Liked",
                url: `/pet-meeting/${result1.id}`,
            }

            const recipientNotif = {
                userId: foundRecipientPet.userId,
                text: `${foundRecipientUserId} like your photo`,
                url: `/pet-meeting/${result1.id}`,
            }

            const result2 = await new Controller('userNotifications').add(senderNotif)
            const result3 = await new Controller('userNotifications').add(recipientNotif)

            // kalau berhasil, jalankan res.send(result 1, 2 dan 3 digabung jadi 1)
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router