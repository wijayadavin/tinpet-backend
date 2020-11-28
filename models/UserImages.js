const Sequelize = require('sequelize')
const { v4 } = require('uuid')
const db = require('../configs/dbConnection')
const basicModel = require('./basicModel')


const UserImages = db.define(
    "user_images",
    {
        ...basicModel.fields,
        url: { type: Sequelize.STRING }
    },
    {
        ...basicModel.options
    }
)


module.exports = UserImages