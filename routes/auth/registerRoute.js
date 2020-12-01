const express = require('express')
const app = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')
const Controller = require('../../controller/dbController')
const UserController = require('../../controller/userController')

app.post('/auth/register', async (req, res, next) => {
  try {
    // parse mobile number data:
    req.body.mobileNumber = "+" + req.body.mobileNumber.replace(" ", "")


    const result1 = await new UserController(req.body)
      .register()

    let userImageData = {
      userId: result1.id,
      url: `${process.env.BASE_URL}/file/default-user.jpg`
    }

    // result2 = memasukan data petImage ke database:
    const result2 = await new Controller('user_images')
      .add(userImageData)


    res.send({ user: result1, userImage: result2 })
  } catch (err) { next(err) }
})


app.use(routeErrorHandler)

module.exports = app