const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const basicModel = require('./basicModel')

const PetLikes = db.define(
    "petLikes",
    {
        ...basicModel.fields,
    },
    {
        ...basicModel.options
    }
)

module.exports = PetLikes