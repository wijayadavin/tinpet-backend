const CustomError = require("../customErrorHelper")

// pet body parser:
function petBodyParser(body) {
    if (body.status) {
        body.status = body.status.toLowerCase()
    }
    if (body.type) {
        body.type = body.type.toLowerCase()
    }
    if (body.status == 'matched') {
        body.isMatched = true
    } else {
        body.isMatched = false
    } delete body.status

    return body
}

// pet result parser:
function petResultParser(result) {
    if (result) {
        // parse structure:
        if (result['dataValues']) {
            result = result['dataValues']
        }
        // parse pet image:
        if (result.petImage) {
            result.imageUrl = result.petImage.url
            delete result.petImage
        }
        // parse matched status:
        if (result.isMatched === true) {
            result.status = 'matched'
        } else if (result.isMatched === false) {
            result.status = 'available'
        }
        else {
            result.status = null
        } delete result.isMatched

        if (result.user) {
            result.userImageUrl = result.user.userImage.url
            result.userFullName = result.user.name
        }

        if (result.like) {
            delete result.like
        }

        if (result.comment) {
            delete result.comment
        }

        if (result.user) {
            delete result.user
        }

        return result
    }


    throw new CustomError(
        404,
        "ER_NOT_FOUND",
        "Not found",
        "The requested pet id was not found"
    )
}

module.exports = {
    petBodyParser,
    petResultParser
}