const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express.Router()
const multer = require('multer')
const errorHandler = require('../../middleware/errorHandler')

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
            splittedFileName[0] = uuidv4()
            const joinedFileName = splittedFileName.join('.')
            cb(null, joinedFileName)
        }

    }
})

const upload = multer({ storage: storage })

const fs = require('fs')
const path = require('path')
const passport = require('passport')
const db = require('../../configs/dbConnection')
const Controller = require('../../controller/dbController')
const { nextTick } = require('process')
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
app.post('/file', upload.single('file'), (req, res, next) => {
    try {
        let body = {}
        body.userId = req.user.id
        body.url = `${process.env.MYSQL_HOST}/file/${name}`
        const result = await new Controller('user_images')
            .add(body)
        res.send({
            result
        })
    } catch (err) {
        next(err)
    }
})


app.use(errorHandler)

module.exports = app