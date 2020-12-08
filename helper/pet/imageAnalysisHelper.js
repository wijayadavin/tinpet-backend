const axios = require('axios');
const fs = require('fs');
const petUploadConfig = require('../../configs/axios/petUploadConfig')
const FormData = require('form-data');
const petAnalyzingConfig = require('../../configs/axios/petAnalyzingConfig')
const deleteAnalyzedDataConfig = require('../../configs/axios/deleteAnalyzedDataConfig')
const petBreedHelper = require('../../helper/pet/petBreedHelper')
const isCatHelper = require('../../helper/pet/isCatHelper')
const _ = require('lodash')
const CustomError = require('../../helper/customErrorHelper')


let imageData = new FormData();
let uploadedPetImage
let result


/**
 * Contoh:
 * 
 *      const imageAnalysisResult = imageAnalysisHelper(req.file.path)
 * 
 * @param {string} filePath the file path to be uploaded to the server
 * 
 * @return {object} image analysis object result
 */
async function imageAnalysisHelper(filePath) {
    // tentukan nama binary dan file path:
    imageData.append('file', fs.createReadStream(filePath));

    // kirim request upload image:
    uploadedPetImage = await axios(petUploadConfig(imageData))
        .then(response => {
            if (_.isEmpty(response)) {
                throw new CustomError(
                    500,
                    "ER_THIRD_PARTY",
                    "Third party server error",
                    "Failed uploading to third party server"
                )
            }
            return response.data
        })

    // Apabila berhasil di upload, masukkan hasil prediksi ke result 3:
    result = await axios(petAnalyzingConfig(uploadedPetImage.id))
        .then(response => {
            return response.data[0]
        })

    // hapus data image yang telah dianalisa dan masukan info ke details:
    result.details = await axios(deleteAnalyzedDataConfig(uploadedPetImage.id))
        .then(response => {
            if (response.status === 204) {
                return "The pet image was successfully analyzed"
            } else {
                return "The pet image was successfully analyzed but failed to delete temp data"
            }
        })

    // tentukan kucing atau anjing:
    if (isCatHelper(result.labels))
        result.predictedBreed = petBreedHelper(result.labels, 'Cat')

    else
        result.predictedBreed = petBreedHelper(result.labels, 'Dog')

    // kembalikan semua hasil:
    return result
}

module.exports = imageAnalysisHelper