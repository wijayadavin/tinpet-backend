const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')

const UserImages = db.define(
    "user_images",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
        },
        url: { type: Sequelize.STRING },
    }
)

module.exports = UserImages