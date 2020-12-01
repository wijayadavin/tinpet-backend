const express = require('express')
const router = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')
const Controller = require('../../controller/dbController')
const formatTableName = require('../../helper/tableNameHelper')

// mengedit meeting berdasarkan meeting id (meetingId):
router.get('/:singularTableName', // --> menghasilkan req.params.id dan req.params.singularTableName
    // auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // format pluralTableName agar sesuai dengan database:
            const pluralTableName = formatTableName(req.params.singularTableName)


            // result = user, maka ambil data user berdasarkan id, lengkap dengan images dan notifications-nya (dijoin semua)
            if (pluralTableName == 'users') {
                // cari data berdasarkan id dari path params:
                const result = await new Controller('users')
                    .getAllJoinLeft(['user_images', 'user_notifications'])

                // kalau berhasil, jalankan res.send(result):
                return res.send(result)
            }

            // result = user, maka ambil data user berdasarkan id, lengkap dengan images dan notifications-nya (dijoin semua)
            if (pluralTableName == 'pets') {
                // cari data berdasarkan id dari path params:
                const result = await new Controller('pets')
                    .getAllJoinLeft('pet_images')

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
            const pluralTableName = formatTableName(req.params.singularTableName)


            if (req.params.singularTableName == 'file') {
                return res.render(`../../uploads/${req.params.id}`)
            }


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


            next(new CustomError(400, "ER_BAD_REQUEST_ERROR", "Bad request", `Please insert the right path parameters`))
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router