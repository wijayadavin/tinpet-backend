const express = require('express') // <-- manggil library express kedalam variable express
const app = express.Router() // <-- memasukkan class Router() punya si express kedalam variable bernama app sehingga bisa memakai app.post/app.get/app.delete/app.path, dll
const Controller = require('../../../controller/dbController') // <-- module-module yang berguna untuk mengubah data database mysql (contoh: CRUD)
const routeErrorHandler = require('../../../middleware/errorHandler') // <-- memasukkan class error handler kedalam variable routeErrorHandler
const auth = require('../../../middleware/auth') // <-- memasukkan module auth middleware kedalam variable auth
const upload = require('../../../middleware/uploadMiddleware')
const { petResultParser } = require('../../../helper/modelHelpers/pet')
const _ = require('lodash')

const CustomError = require('../../../helper/customErrorHelper')
const imageAnalysisHelper = require('../../../helper/pet/imageAnalysisHelper')

app.post('/pet', // <-- menangkap metode post di alamat rute/path: {{baseUrl}}/pet
  upload.single('file'),
  auth.authenticate('bearer', { session: false }), // <-- mengambil dan menerjemahkan data token, dan memasukkan userId dari token kedalam req.user.id
  async (req, res, next) => {
    try {
      // pastikan data type ada di body:
      if (!('type' in req.body)) {
        return next(new CustomError(
          400,
          "ER_INVALID_FORMAT",
          "Error invalid format",
          "pet.type data is needed in body"
        ))
      }
      req.body.type = req.body.type.toLowerCase()

      // kalau user memasukan gambar pet, maka analisa gambar pet teresebut:
      if (!_.isEmpty(req.file) && req.body.type === 'cat') {
        // analyze cat image
      }

      // cari user di database:
      let foundUser = await new Controller('users').get({ id: req.user.id })

      if (foundUser) {
        foundUser = foundUser['dataValues']
        req.body.userId = req.user.id
        // apabila tidak memasukan location, pakai location milik user:
        if (!('address' in req.body) && 'address' in foundUser)
          req.body.address = foundUser.address
        // apabila tidak memasukan city, pakai city milik user:
        if (!('city' in req.body) && 'city' in foundUser)
          req.body.city = foundUser.city
      } else {
        // apabila user tidak ditemukan maka kirim error:
        next(new CustomError(
          404,
          "ER_NOT_FOUND",
          "Error not found",
          "The user id was not found in the database."
        ))
      }


      // result 3 analisa foto pet:
      const result3 = await imageAnalysisHelper(req.file.path)
      if (!('breed' in req.body)) {
        req.body.breed = result3.predictedBreed
      }

      // result1 = memasukkan data pet baru ke database:
      const result1 = await new Controller('pets') // < -- class Controller untuk menjalankan sequelize pada table 'pets'
        .add(req.body) // <-- body (data yang mau dimasukan dari request)

      // apabila user mengupload Image, maka gunakan image:
      let petImageData = {}
      petImageData.petId = result1.id
      if (req.file) {
        petImageData.url = `${process.env.BASE_URL}/file/${req.file.filename}`
      } else {
        // apabila tidak ada, maka gunakan image kosong:
        petImageData.url = `${process.env.BASE_URL}/file/default-pet.jpg`
      }


      // result2 = memasukan data petImage ke database:
      const result2 = await new Controller('pet_images')
        .add(petImageData)


      // mengirim respon hasil data yang berhasil masuk:
      res.send({ pet: petResultParser(result1), petImage: result2, petImageAnalysis: result3 }) // response adalah data yang dikembalikan ke postman
    }
    // menangkap error dan mengirim ke routeErrorHandler:
    catch (err) {
      next(err)
    }
  })

app.use(routeErrorHandler) // <-- akan mengirim error ke user

module.exports = app 
