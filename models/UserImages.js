const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
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