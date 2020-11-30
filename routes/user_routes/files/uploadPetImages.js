const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express.Router()
const multer = require('multer')
const errorHandler = require('../../../middleware/errorHandler')
const shortid = require('shortid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const name = file.originalname;
        const splittedFileName = name.split('.')
        if (splittedFileName.length > 2) {
            console.log("Nama File ada Titiknya");
        } else {
            splittedFileName[0] = shortid.generate()
            const joinedFileName = splittedFileName.join('.')
            cb(null, joinedFileName)
        }

    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const name = file.originalname
        const splittedName = name.split('.')
        console.log(splittedName);
        if (splittedName[1] !== 'jpg') {
            return cb(new Error('image only'))
        } else {
            cb(null, true)
        }
    }
})

const fs = require('fs')
const path = require('path')
const passport = require('passport')
const db = require('../../../configs/dbConnection')
const Controller = require('../../../controller/dbController')
fs.readdir(path.resolve(), (err, files) => {
    if (err) {
        console.log(err);
    } else {
        if (!files.includes('uploads')) {
            fs.mkdir(path.resolve('uploads'), (err) => 1)
        }
    }
})

app.use(passport.authenticate('bearer', { session: false }))
app.post('/file/pet', upload.single('file'), async (req, res, next) => {
    try {
        let body = {}
        body.petId = req.pets.id
        body.url = `http://${process.env.MYSQL_HOST}:${process.env.PORT}/file/${req.file.filename}`
        const result = await new Controller('pet_images')
            .add(body)
        res.send({
            result
        })
    } catch (err) {
        next(err)
    }
})

// app.post('/file', upload.single('file'), (req, res) => {
//     const fileUrl = `http://${process.env.MYSQL_HOST}:${process.env.PORT}/file/${req.file.filename}`
//     res.send({
//         fileUrl
//     })
// })

app.use(errorHandler)
module.exports = app
