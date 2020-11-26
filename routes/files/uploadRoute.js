const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const name = uuidv4;
        cb(null, name)
    }
})

const upload = multer({ storage: storage })

const fs = require('fs')
const path = require('path')
fs.readdir(path.resolve(), (err, files) => {
    if (err) {
        console.log(err);
    } else {
        if (!files.includes('uploads')) {
            fs.mkdir(path.resolve('uploads'), (err) => 1)
        }
    }
})

app.post('/file', upload.single('file'), (req, res) => {
    const fileUrl = `${process.env.MYSQL_HOST}/file/${name}`
    res.send({
        fileUrl
    })
})

module.exports = app