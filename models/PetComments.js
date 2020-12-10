const Sequelize = require('sequelize')
const db = require('../config/dbConnection')
const basicModel = require('./basicModel')

const PetComments = db.define(
    "PetComments",
    {
        ...basicModel.fields,
        text: { type: Sequelize.STRING, allowNull: false }
    },
    {
        ...basicModel.options
    }
)

module.exports = PetComments