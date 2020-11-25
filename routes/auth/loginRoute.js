const express = require('express')
const app = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')
const UserController = require('../../controller/userController')

app.post('/auth/login', async (req, res, next) => {
    try {
        const result = await new UserController(req.body)
            .login()
        res.send(result)
    } catch (err) { next(err) }
})

app.use(routeErrorHandler)

module.exports = app