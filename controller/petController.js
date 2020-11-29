const Controller = require("./dbController");
const validateBody = require('../helper/jsonValidatorHelper');
// const CustomError = require("../helper/customErrorHelper");




const petsSchema = {
    "description": "pet registration validation",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 2,
            "maxLength": 50,
            "allowNull": "false"
        },
        "type": {
            "type": "string",
            "format": "type",
            "allowNull": "false"
        }, 
        "age": {
            "type": "integer",
            "format": "age"
        },
        "gender": {
            "type": "string",
            "allowNull": "false",
            "defaultValue": "male",
            "format": "gender"
        },
        "address": {
            "type": "string",
            "minLength": 2,
            "maxLength": 50,
            "allowNull": "false",
            "format": "address"
        },
        "city": {
            "type": "string",
            "minLength": 2,
            "maxLength" : 50,
            "allowNull": "false",
            "format": "city"
        },
        "breed": {
            "type": "string",
            "minLength": 2,
            "maxLength": 50,
            "allowNull": "false",
            "format": "breed"
        },
        "matched": {
            "type": "sequalize",
            "allowNull": "false",
            "defaultValue": "available"
        },
        "user_id": {
            "type": "sequalize",
            "allowNull": "false"
        }       
    }
}


class UserController extends Controller {
    constructor(body) {
        super('pets')
        this.body = body
    }
    validate() {
        validateBody(this.body, petsSchema)
        return this
    }

    async register() {
        try {
            usersSchema.required = ["name", "type", "age", "gender", "address", "city", "breed", "matched", ]
            this.validate()
            
            const result = await this.add(this.body)
            return result
        } catch (err) { throw err }
    }}

    // async login() {
    //     petsSchema.required = ["name", "type", "gender", "address", "city", "matched"]
    //     this.validate()

    //     let result = await this.get({ email: this.body.email })

    //     if (!result)
    //         throw new CustomError(404, "ER_UNAVAILABLE", "Data not Found", "User unavailable")

    //     result.token = jwt.sign({ id: result.id }, jwtConfig.secret, jwtConfig.options)

    //     return result
    // }

//     async update(id) {
//         try {
//             this.validate()

//             if (this.body.email) {
//                 if (await this.get({ email: this.body.email }))
//                     throw new CustomError(409, "ER_DUP_ENTRY", "Duplicate entry", "The same email already exists")
//             }

//             if (this.body.password)
//                 this.body.password = await salt(this.body.password)

//             const result = await this.edit(id, this.body)

//             return result
//         } catch (err) { throw err }
//     }
// }


module.exports = UserController