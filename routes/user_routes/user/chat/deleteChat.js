const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')


// read semua chat berdasarkan chat id:
router.delete('/user/chat/:chatId', // --> menghasilkan req.params.chatId
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // chatId = req.params.chatId

            // result = delete data dari table 'chats' berdasarkan { id: chatId }

            // kalau ok, jalankan res.send("ok")

            // note: untuk metode .remove, akan mereturn 0(false) apabila gagal, dan 1(true) apabila berhasil
        } catch (err) {
            next(err)
        }
    }
)

router.use(routeErrorHandler)

module.exports = router