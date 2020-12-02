const express = require('express')
const app = express.Router()
const Controller = require('../../../controller/dbController')
const routeErrorHandler = require('../../../middleware/errorHandler')
const auth = require('../../../middleware/auth')
const { petResultParser } = require('../../../helper/modelHelpers/pet')


// get all:
app.get('/pet',
    async (req, res, next) => {
        try {
            const result = await new Controller('pets')
                .getAllJoinLeft('petImages')

            // output data preprocessing:
            if (result.isMatched) {
                result.status = 'matched'
            } else {
                result.status = 'available'
            } delete result.isMatched


            res.send(result.map(petResultParser))
        } catch (err) { next(err) }
    })


// get by id path:
app.get('/pet/:id',
    async (req, res, next) => {
        try {
            const result = await new Controller('pets')
                .getJoinLeft({ id: req.params.id }, 'petImages')


            res.send(petResultParser(result))
        } catch (err) { next(err) }
    })


app.use(routeErrorHandler)

module.exports = app