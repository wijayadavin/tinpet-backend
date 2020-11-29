const express = require('express')
const db = require('../../../configs/dbConnection')
const { authenticate } = require('../../../configs/dbConnection')
const Controller = require('../../../controller/dbController')
const app = express.Router()
const routeErrorHandler = require('../../../middleware/errorHandler')

app.delete('/pet/:id',
  async (req, res, next) => {
    try {
      const result = await new Controller('pets')
        .remove({ id: req.params.id })
      res.send(result)
    } catch (err) { next(err) }
  })



app.use(routeErrorHandler)

module.exports = app


