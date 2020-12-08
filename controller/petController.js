const Controller = require("./dbController");
const getModel = require('../models');
const Sequelize = require('sequelize');

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

const petAttributes = [
    'id',
    'name',
    'userId',
    'isMatched',
    'createdAt',
    [Sequelize.fn("COUNT", Sequelize.col("like.id")), "likeCount"],
    [Sequelize.fn("COUNT", Sequelize.col("comment.id")), "commentCount"]
]

const petIncludes = [
    {
        model: getModel('pet_images')
    },
    {
        as: "like",
        model: getModel('pet_likes'),
        attribute: [],
    },
    {
        as: "comment",
        model: getModel('pet_comments'),
        attribute: [],
    },
    {
        as: "user",
        model: getModel('users'),
        attribute: [],
        include: {
            as: "userImage",
            model: getModel('user_images'),
            attribute: [],
        }
    }
]

class PetController extends Controller {
    constructor(searchParameters, page = 1, limit = 100) {
        super('pets')
        this.searchParameters = searchParameters
        this.page = page
        this.limit = limit
    }

    async filter() {
        try {
            const result = await this.model
                .findAll({
                    attributes: petAttributes,
                    where: this.searchParameters,
                    include: petIncludes,
                    group: ['pets.id'],
                    limit: this.limit,
                    offset: (this.page - 1) * this.limit,
                    subQuery: false,
                    order: [['createdAt', 'DESC']]
                })
            return result
        } catch (err) { throw err }
    }

    async getAll() {
        try {
            const result = await this.model
                .findAll(
                    {
                        include: petIncludes,
                        attributes: petAttributes,
                        group: ['pets.id'],
                        order: [['createdAt', 'DESC']]
                    },

                )
            return result
        } catch (err) { throw err }
    }

    async getDetailed() {
        try {
            const result = await this.model
                .findOne({
                    where: this.searchParameters,
                    include: petIncludes,
                    attributes: petAttributes,
                    group: ['pets.id']
                })
            return result
        } catch (err) { throw err }
    }
}


module.exports = PetController