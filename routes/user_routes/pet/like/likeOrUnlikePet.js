const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')


// mengirim like atau unlike berdasarkan id pet penerima request (petId):
router.post('/pet/meeting/request', // --> menghasilkan req.params.petId dan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // body.senderUserId = req.user.id
            // body.recipientUserId = ambil data userId pada table 'pets' dengan { id: req.params.petId }

            // result1 = tambah atau delete like dengan data body

            // result2 = kirim notification ke kedua belah pihak

            // kalau berhasil, jalankan res.send(result 1, 2 dan 3 digabung jadi 1)
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router