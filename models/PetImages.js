const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const basicModel = require('./basicModel')

const PetImages = db.define(
    "pet_images",
    {
        ...basicModel.fields,
        url: { type: Sequelize.STRING, },
    },
    {
        ...basicModel.options
    }
)

module.exports = PetImages