const Controller = require("./dbController");
const CustomError = require("../helper/customErrorHelper");
const { salt, checkPassword } = require("../helper/bcryptHelper");
const validateBody = require('../helper/jsonValidatorHelper')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwtConfig')
const duplicateChecker = require('../helper/duplicateChecker');
const db = require("../models");
const usersSchema = require("../models/schemas/user");


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

            // hash the password:
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
            throw new CustomError(404, "ER_UNAVAILABLE", "Data not Found", "The user email was not found in the database")
        result = result['dataValues']

        if (!(await checkPassword(this.body.password, result.password)))
            throw new CustomError(401, "ER_CREDENTIALS", "Wrong credentials", "Email and password do not match")

        result.token = jwt.sign({ id: result.id }, jwtConfig.secret, jwtConfig.options)

        return result
    }

    async update(id) {
        try {
            usersSchema.required = Object.keys(this.body)
            this.validate()

            let foundUser = await this.get({ id: id })
            foundUser = foundUser['dataValues']
            let noRepetitionBody = await duplicateChecker(this.body, foundUser)
            if (noRepetitionBody.password)
                noRepetitionBody.password = await salt(noRepetitionBody.password)

            const result = await this.edit(id, noRepetitionBody)

            return result
        } catch (err) { throw err }
    }

    async getUserDataAndUserImage(id) {
        try {
            let result = await this.getCustom(
                { id: id },
                ['name', 'email', 'mobileNumber', 'address', 'city'],
                { attributes: ['url'], model: db['userImages'] }
            )
            result = result['dataValues']

            return result
        } catch (err) { throw err }
    }
}


module.exports = UserController