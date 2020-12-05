const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')

app.get('/', async (req, res) => {
  res.send(`Welcome to TinPet API!
  Our API Documentation:
  <a href=https://documenter.getpostman.com/view/13619777/TVmFkgGw#055d1fd9-fa7d-4145-93de-71a5daf16893>click here</a>`)
})
module.exports = app