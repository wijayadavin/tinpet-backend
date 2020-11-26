const express = require('express')
const Controller = require('../../../controller/dbController')
const app = express.Router()
const routeErrorHandler = require('../../../middleware/errorHandler')

app.post('/pet', async (req, res, next) => {
  try {
    const result = await new Controller('pets')
      .add(req.body)
    res.send(result)
  } catch (err) { next(err) }
})


app.use(routeErrorHandler)

module.exports = app