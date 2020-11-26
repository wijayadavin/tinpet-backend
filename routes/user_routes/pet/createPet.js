const express = require('express')
const { result } = require('lodash')
const db = require('../../../configs/dbConnection')
const Controller = require('../../../controller/dbController')
const app = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')

// router.post('pet/:id',
//   auth.authenticate('bearer', { session:true }),
//   async (req, res, next) => {
//     //ambil data pet 😺👇
//     const foundPets = await db.get('pets',
//     { id: req.params.id })
//     .catch(err => next(err))
  

//     //atur pets ID & user ID di dalam body sesuai permintaan 👇
//     req.body.petsId = req.params.id
//     req.body.userId = req.session.passport.user.userId
  
//     //maksimal satu pet untuk satu user 👇
//     const foundPets = await db.get ('pets', {
//       petsId: req.body.petsId,
//       userId: req.body.userId
//     }).catch(err => next(err))
  
//     if (foundPets && foundPets.length > 0) {
//       //apabila menemukan satu user lebih dari satu pet, maka kirimkan error 👇
//       return res.status(406).send('Error: the user already submitted a review for this movie')
//     }


//     //apabila semuanya sudah sesuai, maka lanjutkan 👇
//     const result = await db.add('pets', req.body)
//       .catch(err => (err))
    
//     // apabila semua data sudah sesuai, maka kirimkan data yang sudah di update 👇
//     result.message = `The pet was successfully updated.`
//     result.result = updatedPets
//     result.result.petsId = foundPets.petsId

//     return res.status(200).send(result)
//     })


app.post('/pet/:id', async (req, res, next) => {
    try {
      const result = await new Controller('pets')
        .add({ id: req.params.id })
      res.send(result)
    } catch (err) { next(err) }
  })
  
  

//apabila akan menjalankan router.post, uncommand 👇
// router.use(errorHandler);
// module.exports = router

//apabila akan menjalankan app.post, uncommand 👇
// app.use(routeErrorHandler)
// module.exports = app