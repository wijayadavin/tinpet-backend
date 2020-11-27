const express = require('express')
const Controller = require('../../controller/dbController')
const CustomError = require('../../helper/customErrorHelper')
const app = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')


app.delete('/admin/user/:id', async (req, res, next) => {
    try {
        if (req.query.id) {
            const result = await new Controller('users')
                .remove(req.query.id)
            if (result) {
                return res.send({ message: "The data was successfully deleted" })
            }

        }
        if (req.params.id) {
            const result = await new Controller('users')
                .remove(req.params.id)

            if (result) {
                return res.send({ message: "The data was successfully deleted" })
            }
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