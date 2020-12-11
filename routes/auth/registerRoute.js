const express = require('express')
const app = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')
const Controller = require('../../controller/dbController')
const UserController = require('../../controller/userController')
const { userBodyParser, userResultParser } = require('../../helper/modelHelpers/user')


app.post('/auth/register', async (req, res, next) => {
  try {
    // parse mobile number data:
    req.body = userBodyParser(req.body)

    let result1 = await new UserController(req.body)
      .register()

    // result2 = memasukan data petImage ke database:
    const result2 = await new Controller('user_images')
      .add({
        userId: result1.id,
        url: `${process.env.BASE_URL}/file/default-user.jpg`
      })

    result1.imageUrl = result2.url
    res.status(201).send(result1)
  } catch (err) { next(err) }
})


app.use(routeErrorHandler)

module.exports = app