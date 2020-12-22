const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const routeErrorHandler = require('../../../../middleware/errorHandler')
const Controller = require('../../../../controller/dbController')

router.get('/notification', // --> tidak menghasilkan query, params ataupun body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            const result = await new Controller('userNotifications').getAll({ userId: req.user.id })

            // kalau berhasil, jalankan res.send(result)
            res.send(result)
        } catch (err) {
            next(err)
        }
    }
)

router.use(routeErrorHandler)

module.exports = router