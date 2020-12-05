const express = require('express')
const Controller = require('../../../../controller/dbController')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const routeErrorHandler = require('../../../../middleware/errorHandler')

// membuat comment baru:
router.post('/pet/:petId/comment', // --> menghasilkan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            const result = await new Controller('petComments').add({
                userId: req.user.id,
                petId: req.params.petId,
                text: req.body.text
            })

            // kalau berhasil, jalankan res.send(result)z
            res.send(result)
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router