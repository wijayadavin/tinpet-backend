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
    if (result.isMatched) {
        result.status = 'matched'
    } else {
        result.status = 'available'
    } delete result.isMatched
    return result
}

module.exports = {
    petBodyParser,
    petResultParser
}