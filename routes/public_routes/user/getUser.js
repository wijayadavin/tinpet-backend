const express = require('express')
const Controller = require('../../../controller/dbController')
const app = express.Router()
const routeErrorHandler = require('../../../middleware/errorHandler')


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


app.use(routeErrorHandler)

module.exports = app