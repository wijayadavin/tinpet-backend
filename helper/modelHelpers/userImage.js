function userImageParser(result) {
    if (result) {
        if (result.dataValues) {
            result = result.dataValues
        }
        if (result.user) {
            result.userImageUrl = result.user.userImage.url
            result.userFullName = result.user.name
            delete result.user
        }
        return result
    }
    throw new CustomError(
        404,
        "ER_NOT_FOUND",
        "Not found",
        "The requested data was not found"
    )
}


module.exports = userImageParser