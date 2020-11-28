const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')


// mengirim meeting baru berdasarkan id pet penerima request (petId), dengan status requested:
router.post('/pet/meeting', // --> menghasilkan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // body.recipientUserId = ambil data userId pada table 'pets' dengan { id: req.body.petId }
            // body.status = "requested"
            // body.time = date+hour

            // delete body.date
            // delete body.hour

            // const newMessage = body.message
            // delete body.message

            // result1 = post data dari body ke table 'pet_meetings'

            // result2 = post data dari newMessage ke table 'chat', kalau chatId sudah ada, createChatLine, kalau tidak ada, createChat.

            // result3 = kirim notification ke kedua belah pihak

            // kalau berhasil, jalankan res.send(result 1, 2 dan 3 digabung jadi 1)
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router