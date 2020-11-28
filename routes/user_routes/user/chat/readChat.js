const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')

// read semua chat berdasarkan user token:
router.get('/user/chat', // --> tidak menghasilkan query, params ataupun body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // result = ambil semua data dari table 'chats' berdasarkan user id

            // kalau berhasil, jalankan res.send(result)
        } catch (err) {
            next(err)
        }
    }
)

// read semua chat berdasarkan chat id:
router.get('/user/chat/:chatId', // -->menghasilkan req.params.chatId
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // chatId = req.params.chatId

            // result = ambil semua data dari table 'chats' berdasarkan { id: chatId }

            // kalau ok, jalankan res.send(result)
        } catch (err) {
            next(err)
        }
    }
)

router.use(routeErrorHandler)

module.exports = router