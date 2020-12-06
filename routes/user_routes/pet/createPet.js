const express = require('express') // <-- manggil library express kedalam variable express
const app = express.Router() // <-- memasukkan class Router() punya si express kedalam variable bernama app sehingga bisa memakai app.post/app.get/app.delete/app.path, dll
const Controller = require('../../../controller/dbController') // <-- module-module yang berguna untuk mengubah data database mysql (contoh: CRUD)
const routeErrorHandler = require('../../../middleware/errorHandler') // <-- memasukkan class error handler kedalam variable routeErrorHandler
const auth = require('../../../middleware/auth') // <-- memasukkan module auth middleware kedalam variable auth
const upload = require('../../../middleware/uploadMiddleware')
const { petResultParser } = require('../../../helper/modelHelpers/pet')
const _ = require('lodash')

const axios = require('axios');
const fs = require('fs');
const petUploadConfig = require('../../../configs/axios/petUploadConfig')
const FormData = require('form-data');
const petAnalyzingConfig = require('../../../configs/axios/petAnalyzingConfig')
const deleteAnalyzedDataConfig = require('../../../configs/axios/deleteAnalyzedDataConfig')
const CustomError = require('../../../helper/customErrorHelper')
const petBreedHelper = require('../../../helper/pet/petBreedHelper')
const isCatHelper = require('../../../helper/pet/isCatHelper')

app.post('/pet', // <-- menangkap metode post di alamat rute/path: {{baseUrl}}/pet
  upload.single('file'),
  auth.authenticate('bearer', { session: false }), // <-- mengambil dan menerjemahkan data token, dan memasukkan userId dari token kedalam req.user.id
  async (req, res, next) => {
    try {
      let imageData = new FormData();
      let uploadedPetImage
      let result3 // <-- hasil prediksi gambar pet

      // kalau user memasukan gambar pet, maka analisa gambar pet teresebut:
      if (!_.isEmpty(req.file)) {
        imageData.append('file', fs.createReadStream(req.file.path));
        uploadedPetImage = await axios(petUploadConfig(imageData))
          .then(response => {
            return response.data
          })

        if (!_.isEmpty(uploadedPetImage)) {
          // Apabila berhasil di upload, masukkan hasil prediksi ke result 3:
          result3 = await axios(petAnalyzingConfig(uploadedPetImage.id))
            .then(response => {
              return response.data[0]
            })
        }
        result3.details = await axios(deleteAnalyzedDataConfig(uploadedPetImage.id))
          .then(response => {
            if (response.status === 204) {
              return "The pet image was successfully analyzed"
            } else {
              return "The pet image was successfully analyzed but failed to delete temp data"
            }
          })
        // analisa apakah foto yang diupload mengandung kucing atau anjing:
        const labels = result3.labels
        if (labels.some(i => i.Parents.some(p => p.Name == 'Cat' || p.Name == 'Dog'))) {
          // tentukan kucing atau anjing:
          if (isCatHelper(labels)) {
            req.body.type = 'cat'
            if (!('breed' in req.body))
              req.body.breed = petBreedHelper(labels, 'Cat')
          } else {
            req.body.type = 'dog'
            if (!('breed' in req.body))
              req.body.breed = petBreedHelper(labels, 'Dog')
          }
        } else {
          // Kalau bukan anjing atau kucing, kirim error:
          next(new CustomError(
            406,
            "ER_NOT_CAT_OR_DOG",
            "Error pet image not acceptable",
            "Please upload a clear image consisting of cat or dog"
          ))
        }
      }


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
      if (req.file) {
        petImageData.url = `${process.env.BASE_URL}/file/${req.file.filename}`
      } else {
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
