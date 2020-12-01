const express = require('express')
const Controller = require('../../../controller/dbController')
const CustomError = require('../../../helper/customErrorHelper')
const app = express.Router()
const routeErrorHandler = require('../../../middleware/errorHandler')


app.get('/user', async (req, res, next) => {
    try {
        // result = ambil data berdasarkan id, lengkap dengan semua associations-nya (dijoin semua)
        const result = await new Controller('users')
            .getAllJoinLeft(['user_images'])

        // kalau berhasil, jalankan res.send(result):
        return res.send(result)
    } catch (err) {
        next(err)
    }
})

app.get('/user/:id', async (req, res, next) => {
    try {
        if (req.query.id) {
            const result = await new Controller('users')
                .getJoinLeft({ id: req.query.id }, 'user_images')

            return res.send(result)
        }
        if (req.params.id) {
            const result = await new Controller('users')
                .getJoinLeft({ id: req.params.id }, 'user_images')

            return res.send(result)
        }
        next(new CustomError(404, "ER_NOT_FOUND", "Not found", "The user id was not found"))
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            code: 500,
            message: "Oops, something is wrong here"
        })
    }
})


app.use(routeErrorHandler)

module.exports = app