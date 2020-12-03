const express = require('express')
const app = express.Router()
const routeErrorHandler = require('../../../middleware/errorHandler')
const { petResultParser, petBodyParser } = require('../../../helper/modelHelpers/pet')
const PetController = require('../../../controller/petController')


// get all or by query:
app.get('/pet',
    async (req, res, next) => {
        try {
            if (req.query.type || req.query.city) {
                const result = await new PetController(
                    petBodyParser(req.query)
                ).filter()


                return res.send(result.map(petResultParser))
            }
            const result = await new PetController('pets')
                .getAll()

            // output & data preprocessing:
            res.send(result.map(petResultParser))
        } catch (err) { next(err) }
    })


// get by id path:
app.get('/pet/:id',
    async (req, res, next) => {
        try {
            const result = await new PetController({ id: req.params.id })
                .getDetailed()

            // output & data preprocessing:
            res.send(petResultParser(result))
        } catch (err) { next(err) }
    })


app.use(routeErrorHandler)

module.exports = app