const Sequelize = require('sequelize')
const db = require('../config/dbConnection')
const basicModel = require('./basicModel')


const Users = db.define(
    "users",
    {
        ...basicModel.fields,
        name: { type: Sequelize.STRING(25), allowNull: false, min: 2, max: 25 },
        email: { type: Sequelize.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false },
        mobileNumber: { type: Sequelize.STRING(15), allowNull: false },
        address: { type: Sequelize.STRING },
        city: { type: Sequelize.STRING(13) }
    },
    {
        ...basicModel.options
    }
)


module.exports = Users;