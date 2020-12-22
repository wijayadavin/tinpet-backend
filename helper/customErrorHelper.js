class CustomError extends Error {
    constructor(status, code, name, message, details, arrayOfInfo) {
        super()
        this.status = status
        this.code = code
        this.name = name
        this.message = message
        this.details = details
        if (arrayOfInfo) {
            this.info = [...arrayOfInfo]
        }
    }
}
module.exports = CustomError