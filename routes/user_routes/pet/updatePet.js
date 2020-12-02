const express = require('express')
const app = express.Router()
const Controller = require('../../../controller/dbController')
const routeErrorHandler = require('../../../middleware/errorHandler')
const auth = require('../../../middleware/auth')
const upload = require('../../../middleware/uploadMiddleware')
const { petBodyParser, petResultParser } = require('../../../helper/modelHelpers/pet')


app.patch('/pet/:petId',
    upload.single('file'),
    auth.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            req.body = petBodyParser(req.body)

            if (req.file) {
                const result1 = await new Controller('pets')
                    .edit(req.params.petId, req.body)

                // result2 = memasukan data petImage ke database:
                const foundPetImage = await new Controller('petImages').get({ petId: req.params.petId })
                const result2 = await new Controller('petImages')
                    .edit(foundPetImage.id, { url: `${process.env.BASE_URL}/file/${req.file.filename}` })

                res.send({ pet: petResultParser(result1), petImage: result2 })
            } else {
                const result1 = await new Controller('pets')
                    .edit(req.params.petId, req.body)

                res.send(petResultParser(result1))
            }

        } catch (err) { next(err) }
    })


app.use(routeErrorHandler)

module.exports = app