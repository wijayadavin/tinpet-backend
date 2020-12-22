const express = require('express')
const app = express.Router()
const Controller = require('../../../../controller/dbController')
const routeErrorHandler = require('../../../../middleware/errorHandler')
const db = require('../../../../models')
const userImageParser = require('../../../../helper/modelHelpers/userImage')

// get all or by query:
app.get('/pet/like/:id',
    async (req, res, next) => {
        try {
            const result = await new Controller('petLikes').getCustom(
                { id: req.params.id },
                ['id', 'createdAt', 'updatedAt', 'petId', 'userId'],
                [{
                    model: db['users'],
                    include: {
                        model: db['userImages']
                    }
                }]
            )

            // output & data preprocessing:
            res.send(userImageParser(result))
        } catch (err) { next(err) }
    })


app.use(routeErrorHandler)

module.exports = app