const express = require('express')
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
             * body.recipientUserId = ambil data userId pada table 'pets' dengan { id: req.params.petId }
             */



            // ekspektasi data body seperti ini:
            /**
             * {
             *      userId: req.body.senderUserId
             *      perId: req.body.recipientUserId
             * }
             */

            /**
             * result1 = tambah atau delete like dengan data body
             * result2 = kirim notification ke sender
             * result 3 = kirim notification ke recipient

             */
            // 
            // 
            // kalau berhasil, jalankan res.send(result 1, 2 dan 3 digabung jadi 1)
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router