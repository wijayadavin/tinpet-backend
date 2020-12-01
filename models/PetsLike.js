const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const basicModel = require('./basicModel')

const PetsLike = db.define(
    "petsLike",
    {
        ...basicModel.fields,
    },
    {
        ...basicModel.options
    }
)

module.exports = PetsLike