const express = require('express') // <-- manggil library express kedalam variable express
const app = express.Router() // <-- memasukkan class Router() punya si express kedalam variable bernama app sehingga bisa memakai app.post/app.get/app.delete/app.path, dll
const Controller = require('../../../controller/dbController') // <-- module-module yang berguna untuk mengubah data database mysql (contoh: CRUD)
const routeErrorHandler = require('../../../middleware/errorHandler') // <-- memasukkan class error handler kedalam variable routeErrorHandler
const auth = require('../../../middleware/auth') // <-- memasukkan module auth middleware kedalam variable auth
const upload = require('../../../middleware/uploadMiddleware')

app.post('/pet', // <-- menangkap metode post di alamat rute/path: {{baseUrl}}/pet
  upload.single('file'),
  auth.authenticate('bearer', { session: false }), // <-- mengambil dan menerjemahkan data token, dan memasukkan userId dari token kedalam req.user.id
  async (req, res, next) => {
    try {
      req.body.userId = req.user.id // <-- cara memasukkan user ID dari req.user.id ke body.userId
      // result1 = memasukkan data pet baru ke database:
      const result1 = await new Controller('pets')
        //                                ^ class Controller untuk menjalankan sequelize pada table 'pets'
        //                    ^ class baru

        .add(req.body) // <-- body (data yang mau dimasukan dari request)
      //    ^req atau request adalah data yang dimasukkan dari postman.


      // apabila user mengupload Image, maka gunakan image:
      let petImageData = {}
      petImageData.petId = result1.id
      petImageData.url = `http://${process.env.DOMAIN}/file/${req.file.filename}`

      // result2 = memasukan data petImage ke database:
      const result2 = await new Controller('pet_images')
        .add(petImageData)


      // mengirim respon hasil data yang berhasil masuk:
      res.send({ pet: result1, petImage: result2 }) // response adalah data yang dikembalikan ke postman
    }
    // menangkap error dan mengirim ke routeErrorHandler:
    catch (err) {
      next(err)
    }
  })

app.use(routeErrorHandler) // <-- akan mengirim error ke user

module.exports = app 
