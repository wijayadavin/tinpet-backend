const Sequelize = require('sequelize')
const db = require('../config/dbConnection')
const basicModel = require('./basicModel')

const UserImages = db.define(
    "userImages",
    {
        ...basicModel.fields,
        url: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        ...basicModel.options
    }
)

module.exports = UserImages