const express = require('express')
const router = require('../../../../teamc-backend/routes/user_routes/movie_review/deleteMovieReview')
const db = require('../../../configs/dbConnection')
const { authenticate } = require('../../../configs/dbConnection')
const Controller = require('../../../controller/dbController')
const app = express.Router()
const routeErrorHandler = require('../../middleware/errorHandler')

// router.delete('/pet/:id')
// auth.authenticate('bearer', { session: true }),
// async(req,res, next) => {
//   //cek apabila delete_petsId sama dengan user ID dari token 👇
//   const foundPets = db.get('pets', {
//     id: req.params.id,
//     userId: req.session.passport.user.id
//   })
//   if (!foundPets|| foundPet.length <= 0) {
//     res.status(403).send('Error: forbidden')
//   }

//   //apabila sudah benar, kirimkan hasil 👇
//   const result = await db.remove({ id: req.params.id }
//   .catch(err => next (err))
//   )
//   if (result) {
//     res.status(200).send('The data was successfully deleted')
//   }
//   res.status(404).send('Error: not found')
// }




app.delete('/pet/:id', async (req, res, next) => {
    try {
      const result = await new Controller('pets')
        .remove({id: req.params.id})
      res.send(result)
    } catch (err) { next(err) }
  })
  
// //apabila akan menjalankan router.post, uncommand 👇
// router.use(errorHandler);
// module.exports = router

//apabila akan menjalankan app.post, uncommand 👇
// app.use(routeErrorHandler)
// module.exports = app