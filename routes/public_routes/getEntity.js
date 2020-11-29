const express = require('express')
const router = express.Router()
const pluralize = require('pluralize')
const routeErrorHandler = require('../../middleware/errorHandler')
const Controller = require('../../controller/dbController')


// mengedit meeting berdasarkan meeting id (meetingId):
router.get('/:singularTableName', // --> menghasilkan req.params.id dan req.params.singularTableName
    // auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            req.params.singularTableName = req.params.singularTableName.replace("-", "_")
            const pluralTableName = pluralize.plural(req.params.singularTableName)
            // result = ambil data berdasarkan id, lengkap dengan semua associations-nya (dijoin semua)
            if (pluralTableName == 'users') {
                // cari data berdasarkan id dari path params:
                const result = await new Controller(pluralTableName)
                    .getAllJoinLeft(['user_images', 'user_notifications'])

                // kalau berhasil, jalankan res.send(result):
                return res.send(result)
            }
            // cari data berdasarkan id dari path params:
            const result = await new Controller(pluralTableName)
                .getAll()

            // kalau berhasil, jalankan res.send(result):
            return res.send(result)
        } catch (err) {
            next(err)
        }
    }
)

// mengedit meeting berdasarkan meeting id (meetingId):
router.get('/:singularTableName/:id', // --> menghasilkan req.params.id dan req.params.singularTableName
    // auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            const pluralTableName = pluralize.plural(req.params.singularTableName)
            // result = ambil data berdasarkan id, lengkap dengan semua associations-nya (dijoin semua)
            if (req.params.id) {
                // cari data berdasarkan id dari path params:
                const result = await new Controller(pluralTableName)
                    .get({ id: req.params.id })

                // kalau berhasil, jalankan res.send(result):
                return res.send(result)
            }
            next(new CustomError(400, "ER_BAD_REQUEST_ERROR", "Bad request", `Please insert the right path parameters`))

        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router