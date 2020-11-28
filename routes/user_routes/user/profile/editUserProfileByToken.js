const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const UserController = require('../../../../controller/userController')
const routeErrorHandler = require('../../../../middleware/errorHandler')


router.patch('/user/profile',
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const result = await new UserController(req.body).update(req.user.id)
            res.send(result)
        } catch (err) { next(err) }
    }
)


router.use(routeErrorHandler)

module.exports = router