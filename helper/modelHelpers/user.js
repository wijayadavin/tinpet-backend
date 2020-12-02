// pet body parser:
function userBodyParser(body) {
    if (body.mobileNumber[0] === '+') {
        body.mobileNumber = body.mobileNumber.replace(" ", "")
        body.mobileNumber = body.mobileNumber.replace("-", "")
        return body
    } else {
        body.mobileNumber = "+" + body.mobileNumber.replace(" ", "")
        body.mobileNumber = body.mobileNumber.replace("-", "")
        return body
    }
}

// pet result parser:
function userResultParser(result) {
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

module.exports = {
    userBodyParser,
    userResultParser
}