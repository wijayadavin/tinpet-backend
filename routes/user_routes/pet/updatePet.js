const express = require('express')
const Controller = require('../../../controller/dbController')
const app = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')

app.patch('/pet', async (req, res, next) => {
    try {
      const result = await new Controller('pets')
        .edit('pet')
      res.send(result)
    } catch (err) { next(err) }
  })
  
  
  app.use(routeErrorHandler)
  
  module.exports = app