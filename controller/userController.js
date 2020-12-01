const Controller = require("./dbController");
const CustomError = require("../helper/customErrorHelper");
const { salt, checkPassword } = require("../helper/bcryptHelper");
const validateBody = require('../helper/jsonValidatorHelper')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../configs/jwtConfig')


const usersSchema = {
    "description": "user registration validation",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 2,
            "maxLength": 50
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "pattern": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$"
        },
        "mobileNumber": {
            "type": "string",
            "pattern": "^\\+[0-9]{9,12}$"
        }
    }
}


class UserController extends Controller {
    constructor(body) {
        super('users')
        this.body = body
    }
    validate() {
        validateBody(this.body, usersSchema)
        return this
    }

    async register() {
        try {
            usersSchema.required = ["name", "email", "password", "mobileNumber"]
            this.validate()

            this.body.password = await salt(this.body.password)

            const result = await this.add(this.body)
            result.token = await jwt.sign({ id: result.id }, jwtConfig.secret, jwtConfig.options)

            return result
        } catch (err) { throw err }
    }

    async login() {
        usersSchema.required = ["email", "password"]
        this.validate()

        let result = await this.get({ email: this.body.email })

        if (!result)
            throw new CustomError(404, "ER_UNAVAILABLE", "Data not Found", "User unavailable")

        if (!(await checkPassword(this.body.password, result.password)))
            throw new CustomError(400, "ER_CREDENTIALS", "Wrong credentials", "Email and password do not match")

        result.token = jwt.sign({ id: result.id }, jwtConfig.secret, jwtConfig.options)

        return result
    }

    async update(id) {
        try {
            this.validate()

            if (this.body.email) {
                if (await this.get({ email: this.body.email }))
                    throw new CustomError(409, "ER_DUP_ENTRY", "Duplicate entry", "The same email already exists")
            }

            if (this.body.password)
                this.body.password = await salt(this.body.password)

            const result = await this.edit(id, this.body)

            return result
        } catch (err) { throw err }
    }
}


module.exports = UserController
