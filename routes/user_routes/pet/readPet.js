const express = require('express')
const app = express.Router()
const Controller = require('../../../controller/dbController')
const routeErrorHandler = require('../../../middleware/errorHandler')
const auth = require('../../../middleware/auth')

// get all:
app.get('/pet',
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const result = await new Controller('pets')
                .getAll()
            res.send(result)
        } catch (err) { next(err) }
    })


// get by id path:
app.get('/pet/:id',
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const result = await new Controller('pets')
                .get({ id: req.params.id })
            res.send(result)
        } catch (err) { next(err) }
    })


app.use(routeErrorHandler)

module.exports = app