const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')

app.get('/', async (req, res) => {
  res.send('Hello World!')
})
module.exports = app