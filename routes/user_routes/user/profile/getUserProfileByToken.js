const express = require('express')
const Controller = require('../../../../controller/dbController')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const routeErrorHandler = require('../../../../middleware/errorHandler')


router.get('/profile',
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            let result = await new Controller('users')
                .getJoinLeft({ id: req.user.id }, 'userImages')
            if (result) {
                // result.imageUrl = result.userImage.url
                return res.send(result)
            }
            next(new CustomError(404, "ER_NOT_FOUND", "Not found", "User id not found"))
        } catch (err) { next(err) }
    }
)


router.use(routeErrorHandler)

module.exports = router