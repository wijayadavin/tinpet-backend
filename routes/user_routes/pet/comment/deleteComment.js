const express = require('express')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const routeErrorHandler = require('../../../../middleware/errorHandler')
const Controller = require('../../../../controller/dbController')

// mendelete comment:
router.delete('/pet-comment/:commentId', // --> menghasilkan req.params.commentId
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            const result = await new Controller('petComments')
                .remove(req.params.commentId)

            // kalau berhasil, jalankan res.send(result)
            if (result) {
                res.send("The comment was successfully deleted")
            }
        } catch (err) {
            next(err)
        }
    })


router.use(routeErrorHandler)

module.exports = router