const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const { v4: uuidv4 } = require('uuid');
const basicModel = require('./basicModel')


const Users = db.define(
    "users",
    {
        ...basicModel.fields,
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, unique: true, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
        mobileNumber: { type: Sequelize.STRING, allowNull: false }
    },
    {
        ...basicModel.options
    }
)


module.exports = Users;