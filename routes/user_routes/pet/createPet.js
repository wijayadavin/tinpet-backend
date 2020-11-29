const express = require('express') // <-- manggil library express kedalam variable express
const app = express.Router() // <-- memasukkan class Router() punya si express kedalam variable bernama app sehingga bisa memakai app.post/app.get/app.delete/app.path, dll

const Controller = require('../../../controller/dbController') // <-- module-module yang berguna untuk mengubah data database mysql (contoh: CRUD)

const routeErrorHandler = require('../../../middleware/errorHandler') // <-- memasukkan class error handler kedalam variable routeErrorHandler

const auth = require('../../../middleware/auth') // <-- memasukkan module auth middleware kedalam variable auth


app.post('/pet', // <-- menangkap metode post di alamat rute/path: {{baseUrl}}/pet
  auth.authenticate('bearer', { session: false }), // <-- mengambil dan menerjemahkan data token, dan memasukkan userId dari token kedalam req.user.id
  async (req, res, next) => {
    try {
      req.body.userId = req.user.id // <-- cara memasukkan user ID dari req.user.id ke body.userId

      // memasukkan data pet baru ke database dan kalau berhasil akan terekam di variable result:
      const result = await new Controller('pets')
        //                                ^ class Controller untuk menjalankan sequelize pada table 'pets'
        //                    ^ class baru

        .add(req.body) // <-- body (data yang mau dimasukan dari request)
      //    ^req atau request adalah data yang dimasukkan dari postman.

      // mengirim respon hasil data yang berhasil masuk:
      res.send(result) // response adalah data yang dikembalikan ke postman
    }
    // menangkap error dan mengirim ke routeErrorHandler:
    catch (err) {
      next(err)
    }
  })

app.use(routeErrorHandler) // <-- akan mengirim error ke user

module.exports = app 
