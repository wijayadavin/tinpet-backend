const express = require('express')
const app = express.Router()
const Controller = require('../../../controller/dbController')
const routeErrorHandler = require('../../../middleware/errorHandler')
const auth = require('../../../middleware/auth')

app.post('/chat',
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            req.body.userId = req.user.id
            const result = await new Controller('chats')
                .add(req.body)
            res.send(result)
        }
        catch (err) {
            next(err)
        }
    })


app.use(routeErrorHandler)

module.exports = app