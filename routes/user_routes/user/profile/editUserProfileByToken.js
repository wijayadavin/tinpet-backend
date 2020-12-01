const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const UserController = require('../../../../controller/userController')
const routeErrorHandler = require('../../../../middleware/errorHandler')
const upload = require('../../../../middleware/uploadMiddleware')

router.patch('/user/profile',
    upload.single('file'),
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            if (req.file.filename) {
                const result1 = await new UserController(req.body).update(req.user.id)

                // result2 = edit data petImage di database:
                const foundUserImage = await new Controller('users').get({ id: req.user.id })
                const result2 = await new Controller('users')
                    .edit(foundUserImage.id, { url: `http://${process.env.BASE_URL}/file/${req.file.filename}` })

                res.send({ pet: result1, petImage: result2 })
            } else {
                const result1 = await new UserController(req.body).update(req.user.id)

                res.send(result1)
            }
        } catch (err) { next(err) }
    }
)


router.use(routeErrorHandler)

module.exports = router