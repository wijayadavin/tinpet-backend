const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const UserController = require('../../../../controller/userController')
const routeErrorHandler = require('../../../../middleware/errorHandler')
const upload = require('../../../../middleware/uploadMiddleware')
const Controller = require('../../../../controller/dbController')
const { userBodyParser } = require('../../../../helper/modelHelpers/user')


router.patch('/profile',
    upload.single('file'),
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            req.body = userBodyParser(req.body)
            if (req.file) {
                const result1 = await new UserController(req.body).update(req.user.id)

                // result2 = edit data userImage di database:
                const foundUserImage = await new Controller('userImages').get({ userId: req.user.id })
                const result2 = await new Controller('userImages')
                    .edit(foundUserImage.id, { url: `${process.env.BASE_URL}/file/${req.file.filename}` })

                res.send({ user: result1, userImage: result2 })
            } else {
                let result1 = await new UserController(req.body).update(req.user.id)
                const userImage = await new Controller('userImages').get({ userId: req.user.id })
                result1.imageUrl = userImage['dataValues'].url
                res.send(result1)
            }
        } catch (err) { next(err) }
    }
)


router.use(routeErrorHandler)

module.exports = router