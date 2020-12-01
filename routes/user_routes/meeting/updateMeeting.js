const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')
const routeErrorHandler = require('../../../middleware/errorHandler')


// mengedit meeting berdasarkan meeting id (meetingId):
router.post('/meeting/:meetingId', // --> menghasilkan req.params.meetingId dan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // foundMeeting = get meeting by req.params.meetingId

            // check apakah   foundMeeting.senderUserId = req.user.id   atau   foundMeeting.recipientUserId = req.user.id

            // result1 = update data dari body ke table 'pet_meetings'

            // result2 = kirim notification ke kedua belah pihak

            // kalau berhasil, jalankan res.send(result 1 dan 2 digabung jadi 1)
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router