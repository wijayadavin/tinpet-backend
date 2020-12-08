const express = require('express')
const app = express.Router()
const routeErrorHandler = require('../../../middleware/errorHandler')
const { petResultParser } = require('../../../helper/modelHelpers/pet')
const PetController = require('../../../controller/petController')
const auth = require('../../../middleware/auth')


// get all or by query:
app.get('/profile/pet',
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {

            const result = await new PetController({ userId: req.user.id }, req.query.page, req.query.limit)
                .filter()

            // output & data preprocessing:
            res.send(result.map(petResultParser))
        } catch (err) { next(err) }
    })


app.use(routeErrorHandler)

module.exports = app