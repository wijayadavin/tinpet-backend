const express = require('express')
const Controller = require('../../../controller/dbController')
const app = express.Router()
const routeErrorHandler = require('../../../middleware/errorHandler')


// get all:
app.get('/pet',
    async (req, res, next) => {
        try {
            const result = await new Controller('pets')
                .getAll()
            res.send(result)
        } catch (err) { next(err) }
    })


// get by id path:
app.get('/pet/:id',
    async (req, res, next) => {
        try {
            const result = await new Controller('pets')
                .get({ id: req.params.id })
            res.send(result)
        } catch (err) { next(err) }
    })


app.use(routeErrorHandler)

module.exports = app