const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const routeErrorHandler = require('../../../../middleware/errorHandler')
const Controller = require('../../../../controller/dbController')


// read semua chat berdasarkan user token:
router.get('/chat/', // --> tidak menghasilkan query, params ataupun body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            const result1 = await new Controller('userChats')
                .get({ user1Id: req.user.id })

            const result2 = await new Controller('userChats')
                .get({ user2Id: req.user.id })
            let result = {}
            if (result1) {
                result = result1['dataValues']
            }
            if (result2) {
                result = result2['dataValues']
            }
            // kalau berhasil, jalankan res.send(result)
            res.send(result)
        } catch (err) {
            next(err)
        }
    }
)

// read semua chat berdasarkan chat id:
router.get('/chat/:chatId', // -->menghasilkan req.params.chatId
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            const result = await new Controller('userChatLines')
                .get({ userChatId: req.params.chatId })

            // kalau ok, jalankan res.send(result)
            res.send(result['dataValues'])
        } catch (err) {
            next(err)
        }
    }
)

router.use(routeErrorHandler)

module.exports = router