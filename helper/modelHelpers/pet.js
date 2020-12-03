// pet body parser:
function petBodyParser(body) {
    if (body.status = 'matched') {
        body.isMatched = true
    } else {
        body.isMatched = false
    } delete body.status
    return body
}

// pet result parser:
function petResultParser(result) {
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

    // parse like and comment counts:


    return result
}

module.exports = {
    petBodyParser,
    petResultParser
}