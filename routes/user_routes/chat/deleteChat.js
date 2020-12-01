const express = require('express')
const app = express.Router()
const Controller = require('../../../controller/dbController')
const routeErrorHandler = require('../../../middleware/errorHandler')
const auth = require('../../../middleware/auth')


app.delete('/user/:id',
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const result = await new Controller('chatlines')
                .remove({ id: req.params.id })
            res.send(result)
        } catch (err) { next(err) }
    })

app.use(routeErrorHandler)

module.exports = app