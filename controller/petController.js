const Controller = require("./dbController");
const getModel = require('../models')

// const petsSchema = {
//     "description": "pet registration validation",
//     "type": "object",
//     "properties": {
//         "name": {
//             "type": "string",
//             "minLength": 2,
//             "maxLength": 50,
//             "allowNull": "false"
//         },
//         "type": {
//             "type": "string",
//             "format": "type",
//             "allowNull": "false"
//         },
//         "age": {
//             "type": "integer",
//             "format": "age"
//         },
//         "gender": {
//             "type": "string",
//             "allowNull": "false",
//             "defaultValue": "male",
//             "format": "gender"
//         },
//         "address": {
//             "type": "string",
//             "minLength": 2,
//             "maxLength": 50,
//             "allowNull": "false",
//             "format": "address"
//         },
//         "city": {
//             "type": "string",
//             "minLength": 2,
//             "maxLength": 50,
//             "allowNull": "false",
//             "format": "city"
//         },
//         "breed": {
//             "type": "string",
//             "minLength": 2,
//             "maxLength": 50,
//             "allowNull": "false",
//             "format": "breed"
//         },
//         "isMatched": {
//             "type": "sequalize",
//             "allowNull": "false",
//             "defaultValue": "available"
//         },
//         "user_id": {
//             "type": "sequalize",
//             "allowNull": "false"
//         }
//     }
// }

const petAttributes = ['id', 'name', 'userId', 'isMatched']
class PetController extends Controller {
    constructor(searchParameters) {
        super('pets')
        this.searchParameters = searchParameters
    }

    async filter() {
        try {
            const result = await this.model
                .findAll({
                    attributes: petAttributes,
                    where: this.searchParameters,
                    include: getModel('pet_images')
                })
            return result
        } catch (err) { throw err }
    }

    async getAll() {
        try {
            const result = await this.model
                .findAll({
                    attributes: petAttributes,
                    include: getModel('pet_images')
                })
            return result
        } catch (err) { throw err }
    }

    async getDetailed() {
        try {
            const result = await this.model
                .findOne({
                    where: this.searchParameters,
                    include: getModel('pet_images')
                })
            return result
        } catch (err) { throw err }
    }
}


module.exports = PetController