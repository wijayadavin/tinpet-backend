class CustomError extends Error {
    constructor(status, code, name, message, details) {
        super()
        this.status = status
        this.code = code
        this.name = name
        this.message = message
        this.details = details
    }
}
module.exports = CustomError