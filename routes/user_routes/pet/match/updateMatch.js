const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const auth = require('../../../../../middleware/auth')


// mengedit match berdasarkan match id (matchId):
router.post('/match/:matchId', // --> menghasilkan req.params.matchId dan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // foundMatch = get match by req.params.matchId

            // check apakah   foundMatch.senderUserId = req.user.id   atau   foundMatch.recipientUserId = req.user.id

            // result1 = update data dari body ke table 'pet_matches'

            // result2 = kirim notification ke kedua belah pihak

            // kalau berhasil, jalankan res.send(result 1 dan 2 digabung jadi 1)
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router