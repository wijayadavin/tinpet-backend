const express = require('express')
const app = express.Router()
const Controller = require('../../../controller/dbController')
const routeErrorHandler = require('../../../middleware/errorHandler')
const auth = require('../../../middleware/auth')


app.patch('/pet',
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const result = await new Controller('pets')
                .edit(req.userId, req.body)
            res.send(result)
        } catch (err) { next(err) }
    })


app.use(routeErrorHandler)

module.exports = app