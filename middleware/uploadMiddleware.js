const multer = require('multer')
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

module.exports = upload