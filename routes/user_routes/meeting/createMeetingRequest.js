const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')
const routeErrorHandler = require('../../../middleware/errorHandler')
const Controller = require('../../../controller/dbController')
const nodemailerConfig = require('../../../configs/nodemailerConfig')
const searchArrayOfObjects = require('../../../helper/searchArrayOfObjects')


// mengirim meeting baru berdasarkan id pet penerima request (petId), dengan status requested:
router.post('/pet/meeting', // --> menghasilkan req.body
    auth.authenticate('bearer', { session: false }), // --> menghasilkan req.user.id
    async (req, res, next) => {
        try {
            // foundRecipientPet = ambil data userId pada table 'pets' dengan { id: req.body.petId }:
            const foundRecipientPet = await new Controller('pets').get({ id: req.body.petId })
            delete req.body.petId

            // merge body and hour ke dalam body dengan key 'time':
            req.body.time = await req.body.date + "T" + req.body.hour
            delete req.body.date
            delete req.body.hour

            // masukan UserId penerima (recipient) ke body:
            req.body.recipientId = req.user.id

            // create data baru di table meetings:
            const result1 = await new Controller('meetings').add(req.body)

            // siapkan data notif untuk sender user:
            const senderNotif = {
                userId: req.user.id,
                text: "Your meeting request has been sent",
                url: `${process.env.DOMAIN}/pet-meeting/${result1.id}`,
            }

            // siapkan data notif untuk recipient user:
            const recipientNotif = {
                userId: foundRecipientPet.userId,
                text: "You received a new meeting request",
                url: senderNotif.url,
            }

            // kirim notification ke kedua belah pihak:
            const result2 = await new Controller('userNotifications').add(senderNotif)
            const result3 = await new Controller('userNotifications').add(recipientNotif)


            // cari chatId:
            let senderChatList1 = await new Controller('userChats').get({
                userId1: req.user.id
            })

            let senderChatList2 = await new Controller('userChats').get({
                userId2: req.user.id
            })


            // if some values inside chat object has recipient user id, choose that chat id:
            let foundChat = 0
            let result4 = {}
            let senderChatList = {
                ...senderChatList1,
                ...senderChatList2
            }

            if (senderChatList) {
                if (typeof senderChatList != 'array') {
                    senderChatList = [senderChatList]
                }
                if (senderChatList.length) {
                    foundChat = searchArrayOfObjects(foundRecipientPet.userId, senderChatList)
                }
            }


            if (foundChat) {
                // kirim chatLine baru ke responder:
                result4 = await new Controller('userChatLines').add({
                    userChatId: foundChat.id,
                    userId: req.user.id,
                    text: req.body.text
                })
            } else {
                // buat chat baru:
                const newChat = await new Controller('userChats').add({
                    userId1: req.user.id,
                    userId2: foundRecipientPet.userId
                })
                // kirim chatLine baru ke responder:
                result4 = await new Controller('userChatLines').add({
                    userChatId: newChat.id,
                    userId: req.user.id,
                    text: req.body.text
                })
            }


            // data yang akan dipakai dalam pengiriman email untuk result 4:
            const mailOptions = {
                from: '"TinPet" <cs.wijayadavin@gmail.com>',
                to: 'wijayadavin@gmail.com',
                subject: '🐱 You received a new meeting request in TinPet!',
                html: `
                <h1>
                    Hi! Your pet named ${foundRecipientPet.name} has received a meeting request!
                </h1>
                <h3>
                    Please go to this <a href="${recipientNotif.url}">link</a> to respond the request:
                </h3>
                `
            }

            // result 4, mengirimkan notifikasi email:
            const result5 = await nodemailerConfig.sendMail(mailOptions)
                .catch(err => { next(err) })

            // kalau berhasil, jalankan res.send(result 1, 2, 3, dan 4 digabung jadi 1):
            if (result5) {
                res.send({
                    result: result1,
                    senderNotif: result2,
                    recipientNotif: result3,
                    chatlines: result4,
                    recipientEmailNotif: {
                        messageSent: result5.messageId,
                        ...mailOptions
                    }
                })
            } else {
                res.send({
                    result: result1,
                    senderNotif: result2,
                    recipientNotif: result3,
                    chatlines: result4,
                    recipientEmailNotif: null
                })
            }
        } catch (err) {
            next(err)
        }
    }
)


router.use(routeErrorHandler)

module.exports = router