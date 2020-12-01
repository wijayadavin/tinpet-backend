const express = require('express')
const router = express.Router()
const auth = require('../../../../../middleware/auth')
const routeErrorHandler = require('../../../../../middleware/errorHandler')


// kirimkan chat berdasarkan id user penerima (recipientId):
router.post('/user/:userId', // --> menghasilkan req.params.userId
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // senderId = req.user.id
            // recipientId = req.params.userId

            // foundChatId = berdasarkan { user1Id = recipientId } dan { user2Id = senderId } ataupun sebaliknya (2x pencarian)

            // result = post data dari body ke table 'chat_lines' berdasarkan { id: foundChatId }

            // kalau berhasil, jalankan res.send(result)
        } catch (err) {
            next(err)
        }
    }
)

// kirimkan chat berdasarkan chat id:
router.post('/user/chat/:chatId/line', // --> menghasilkan req.params.chatId
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // chatId = req.params.chatId

            // result = post data dari body ke table 'chat_lines' berdasarkan chat id

            // kalau berhasil, jalankan res.send(result)
        } catch (err) {
            next(err)
        }
    }
)

router.use(routeErrorHandler)

module.exports = router