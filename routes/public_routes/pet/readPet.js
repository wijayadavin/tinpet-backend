const express = require('express')
const app = express.Router()
const routeErrorHandler = require('../../../middleware/errorHandler')
const { petResultParser, petBodyParser } = require('../../../helper/modelHelpers/pet')
const PetController = require('../../../controller/petController')
const _ = require('lodash')
const { type } = require('os')

// get all or by query:
app.get('/pet',
    async (req, res, next) => {
        try {
            if (!_.isEmpty(req.query)) {
                // get filter parameters data from query:
                let filterParameters = { ...req.query }
                if (filterParameters.page) {
                    delete filterParameters.page
                }
                if (filterParameters.limit) {
                    delete filterParameters.limit
                }

                // if not specify the page, page equal to 1:
                if (!req.query.page) {
                    req.query.page = parseInt(1)
                } else {
                    req.query.page = parseInt(req.query.page)
                }

                // if not specify the limit, limit equal to 100:
                if (!req.query.limit) {
                    req.query.limit = parseInt(100)
                } else {
                    req.query.limit = parseInt(req.query.limit)
                }

                // get the result
                const result = await new PetController(
                    petBodyParser(filterParameters),
                    req.query.page,
                    req.query.limit
                ).filter()

                return res.send(result.map(petResultParser))
            }

            // if no query, get all result
            const result = await new PetController().getAll()

            // output & data preprocessing:
            res.send(result.map(petResultParser))
        } catch (err) { next(err) }
    })


// get by id path:
app.get('/pet/:id',
    async (req, res, next) => {
        try {
            const result = await new PetController(
                { id: req.params.id },
                req.query.page,
                req.query.limit)
                .getDetailed()

            // output & data preprocessing:
            res.send(petResultParser(result))
        } catch (err) { next(err) }
    })


app.use(routeErrorHandler)

module.exports = app