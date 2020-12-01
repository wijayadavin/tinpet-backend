const nodemailer = require('nodemailer')


// buat transporter object menggunakan SMTP Transport:
let transporter = nodemailer.createTransport({
    // settings for gmail:
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // gmail email
        pass: process.env.PASSWORD // account password
    },
    tls: { rejectUnauthorized: false } //option tambahan untuk testing di localhost
})


module.exports = transporter