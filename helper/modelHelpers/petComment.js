const Controller = require("../../controller/dbController")

// pet result parser:
function petCommentResultParser(result) {
    if (result['dataValues']) {
        result = result['dataValues']
    }
    if (result.user) {
        result.userFullName = result.user.name
        delete result.user
    }

    return result
}

module.exports = {
    petCommentResultParser
}