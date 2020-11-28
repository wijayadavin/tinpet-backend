const express = require('express')
const router = express.Router()
const auth = require('../../../../../middleware/auth')
const pluralize = require('pluralize')


// mengedit meeting berdasarkan meeting id (meetingId):
router.get('/:singularTableName/:id', // --> menghasilkan req.params.id dan req.params.singularTableName
    // auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            const pluralTableName = pluralize.plural(req.params.singularTableName)
            // result = ambil data berdasarkan id, lengkap dengan semua associations-nya (dijoin semua)

            if (req.query.id) {
                // cari data berdasarkan id dari query id:
                const result = await new Controller(pluralTableName)
                    .get({ id: req.query.id })

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
            next(new CustomError(404, "ER_NOT_FOUND", "Not found", `The ${singularTableName} id was not found`))

        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router