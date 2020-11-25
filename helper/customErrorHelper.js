class CustomError extends Error {
    constructor(status, code, name, message) {
        super()
        this.status = status
        this.code = code
        this.name = name
        this.message = message
    }
}
module.exports = CustomError