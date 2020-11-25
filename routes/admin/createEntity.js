const app = require('express')
const uuid = require('uuid')
const router = app.Router()
const db = require('../../controller/dbController')
const routeErrorHandler = require('../../middleware/errorHandler')
const pluralize = require('pluralize')

router.post('/admin/:tableName/', async (req, res, next) => {
    // Check request:
    const tableName = req.params.tableName
    if (tableName.length <= 0 ||
        req.body <= 0) {
        return res.status(400).send('Bad request')
    }

    // set id value with uuid:
    req.body.id = `/${pluralize.singular(tableName)}/` + uuid()
    // Try adding the data into the database
    try {
        const result = await db.add(tableName, req.body)
        return res.status(200).send(result)
    } catch (err) {
        console.log(err);
        return next(new Error(err))
    }

})


router.use(routeErrorHandler)

module.exports = router