const Sequelize = require('sequelize')
const { v4 } = require('uuid')
const db = require('../configs/dbConnection')

const UserImages = db.define(
    "user_images",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
        },
        imageUrl: { type: Sequelize.STRING }
    }
)

module.exports = UserImages