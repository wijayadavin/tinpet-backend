const express = require('express')
const router = express.Router()
const auth = require('../../../../../middleware/auth')


router.delete('/user/chat/:chatLineId', // --> menghasilkan req.params.chatLineId
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // chatLineId = req.params.chatLineId

            // result = delete data dari table 'chat_lines' berdasarkan chatLineId dengan kondisi user_id = req.user.id

            // kalau berhasil, jalankan res.send(result)
        } catch (err) {
            next(err)
        }
    }
)

router.use(routeErrorHandler)

module.exports = router