const express = require('express')
const Controller = require('../../../../controller/dbController')
const router = express.Router()
const auth = require('../../../../middleware/auth')
const routeErrorHandler = require('../../../../middleware/errorHandler')
const customError = require('../../../../helper/customErrorHelper')


// mengirim like atau unlike berdasarkan id pet penerima request (petId):
router.post('/pet/:petId/like', // --> menghasilkan req.params.petId
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            /**
             * kumpulkan data ke variable body:
             * let body = {}
             * body.senderUserId = req.user.id
             * foundRecipientUserId = ambil data userId pada table 'pets' dengan { id: req.params.petId }
             */


            let data = {}
            data.userId = req.user.id
            data.petId = req.params.petId
            const foundLike = await new Controller('petLikes')
                .get({
                    user_id: req.user.id,
                    pet_id: req.params.petId
                })

            /**
             * ekspektasi data body seperti ini:
             * {
             *      userId: req.user.id
             *      petId: req.params.petId
             * }
             */



            /**
             * result1 = tambah atau delete like dengan data body
             * result2 = kirim notification ke sender ({ id: req.user.id })
             * result3 = kirim notification ke recipient ({ id: foundRecipientUserId })
             */
            if (foundLike) {
                await new Controller('petLikes').remove(foundLike.id)
                return res.send('The user was succesfully unlike the pet')
            } else {
                const foundRecipientUser = await new Controller('users').get({ id: req.user.id })
                const result1 = await new Controller('petLikes').add(data)

                const recipientNotif = {
                    userId: req.user.id,
                    text: `${foundRecipientUser.name} like your pet`,
                    url: `/pet-like/${result1.id}`
                }
                const result2 = await new Controller('userNotifications').add(recipientNotif)

                return res.status(201).send({ petLike: result1, recipientNotif: result2 })
            }
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router