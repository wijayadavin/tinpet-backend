const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')


// mengedit comment:
router.post('/pet/comment', // --> menghasilkan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // result = edit comment berdasarkan comment id, dan userId harus sama dengan recipientnya

            // kalau berhasil, jalankan res.send(result)
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router