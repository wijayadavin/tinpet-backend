const express = require('express')
const Controller = require('../../../../controller/dbController')
const { petCommentResultParser } = require('../../../../helper/modelHelpers/petComment')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const routeErrorHandler = require('../../../../middleware/errorHandler')

// membuat comment baru:
router.get('/pet/:petId/comment', // --> menghasilkan req.body
    async (req, res, next) => {
        try {
            let result = await new Controller('petComments')
                .getAllJoinLeft(['users'])
            // kalau berhasil, jalankan res.send(result)
            res.send(result.map(petCommentResultParser))
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router