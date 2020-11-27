const express = require('express')
const Controller = require('../../../controller/dbController')
const router = express.Router()
const auth = require('../../../middleware/auth')

const routeErrorHandler = require('../../../middleware/errorHandler')


router.get('/profile',
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const result = await new Controller('users')
                .get({ id: req.user.id })
            if (result) {
                return res.send(result)
            }
            next(new CustomError(404, "ER_NOT_FOUND", "Not found", "User id not found"))
        } catch (err) { next(err) }
    }
)


router.use(routeErrorHandler)

module.exports = router