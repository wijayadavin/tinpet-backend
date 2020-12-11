const Sequelize = require('sequelize')
const db = require('../config/dbConnection')
const basicModel = require('./basicModel')

const PetImages = db.define(
    "petImages",
    {
        ...basicModel.fields,
        url: { type: Sequelize.STRING, },
    },
    {
        ...basicModel.options
    }
)

module.exports = PetImages