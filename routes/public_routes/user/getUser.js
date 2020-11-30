const express = require('express')
const Controller = require('../../../controller/dbController')
const CustomError = require('../../../helper/customErrorHelper')
const app = express.Router()
const routeErrorHandler = require('../../../middleware/errorHandler')


app.get('/user', async (req, res, next) => {
    try {
        const result = await new Controller('users')
            .getAll()

        res.send(result)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            code: 500,
            message: "Oops, something is wrong here"
        })
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