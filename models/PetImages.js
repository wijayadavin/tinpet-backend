const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')

const PetImages = db.define(
    "pet_images",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
        },
        url: { type: Sequelize.STRING },
    }
)

module.exports = PetImages