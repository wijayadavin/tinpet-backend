const express = require('express')
const app = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')
const UserController = require('../../controller/userController')

app.post('/auth/register', async (req, res, next) => {
  try {
    req.body.mobileNumber = "+" + req.body.mobileNumber.replace(" ", "")
    const result = await new UserController(req.body)
      .register()
    res.send(result)
  } catch (err) { next(err) }
})


app.use(routeErrorHandler)

module.exports = app