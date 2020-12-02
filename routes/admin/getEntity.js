const express = require('express')
const router = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')
const Controller = require('../../controller/dbController')
const formatTableName = require('../../helper/tableNameHelper')

// mengedit meeting berdasarkan meeting id (meetingId):
router.get('/admin/:singularTableName', // --> menghasilkan req.params.id dan req.params.singularTableName
    // auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            req.params.singularTableName = req.params.singularTableName.replace("-", "_")
            const pluralTableName = pluralize.plural(req.params.singularTableName)

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
router.get('/admin/:singularTableName/:id', // --> menghasilkan req.params.id dan req.params.singularTableName
    // auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // parse table name:
            const pluralTableName = pluralize.plural(req.params.singularTableName)

            // result = ambil data berdasarkan id, lengkap dengan semua associations-nya (dijoin semua)
            if (pluralTableName == 'users') {
                // cari data berdasarkan id dari path params:
                const result = await new Controller(pluralTableName)
                    .getJoinLeft({ id: req.params.id }, ['user_images', 'user_notifications'])


                // kalau berhasil, jalankan res.send(result):
                return res.send(result)
            }


            if (pluralTableName == 'pets') {
                // cari data berdasarkan id dari path params:
                const result = await new Controller(pluralTableName)
                    .getJoinLeft({ id: req.params.id }, 'pet_images')


                // kalau berhasil, jalankan res.send(result):
                return res.send(result)
            }


            if (req.params.id) {
                // cari data berdasarkan id dari path params:
                const result = await new Controller(pluralTableName)
                    .get({ id: req.params.id })


                // kalau berhasil, jalankan res.send(result):
                return res.send(result)
            }

            if (req.query.id) {
                // cari data berdasarkan id dari path query:
                const result = await new Controller(pluralTableName)
                    .get({ id: req.query.id })

                // kalau berhasil, jalankan res.send(result):
                return res.send(result)
            }
            next(new CustomError(400, "ER_BAD_REQUEST_ERROR", "Bad request", `Please insert the right path parameters`))


            next(new CustomError(400, "ER_BAD_REQUEST_ERROR", "Bad request", `Please insert the right path parameters`))
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router