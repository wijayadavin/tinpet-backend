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
                .get({ id: req.query.id })

            return res.send(result)
        }
        if (req.params.id) {
            const result = await new Controller('users')
                .get({ id: req.params.id })

            return res.send(result)
        }
        next(new CustomError(400, "ER_BAD_REQUEST_ERROR", "Bad request", "Invalid user id"))
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