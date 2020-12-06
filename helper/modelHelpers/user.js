const CustomError = require("../customErrorHelper")

// pet body parser:
function userBodyParser(body) {
    if (body.mobileNumber) {
        if (body.mobileNumber[0] === '+') {
            body.mobileNumber = body.mobileNumber.replace(" ", "")
            body.mobileNumber = body.mobileNumber.replace("-", "")
            return body
        } else if (body.mobileNumber[0] === '0') {
            body.mobileNumber = body.mobileNumber.substring(1)
            body.mobileNumber = "+62" + body.mobileNumber.replace(" ", "")
            body.mobileNumber = body.mobileNumber.replace("-", "")
            return body
        }
        else {
            body.mobileNumber = "+" + body.mobileNumber.replace(" ", "")
            body.mobileNumber = body.mobileNumber.replace("-", "")
            return body
        }
    }
}

// pet result parser:
function userResultParser(result) {
    if (result) {
        if (result['dataValues']) {
            result = result['dataValues']
        }
        if (result.userImage) {
            result.imageUrl = result.userImage.url
            delete result.userImage
        }
        delete result.password
        delete result.mobileNumber
        delete result.email
        return result
    }
    throw new CustomError(404, "ER_NOT_FOUND", "Not found", "The user id was not found")
}

module.exports = {
    userBodyParser,
    userResultParser
}