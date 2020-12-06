const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const { v4: uuidv4 } = require('uuid');
const basicModel = require('./basicModel')


const Users = db.define(
    "users",
    {
        ...basicModel.fields,
        name: { type: Sequelize.STRING(25), allowNull: false, min: 2, max: 25 },
        email: { type: Sequelize.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false },
        mobileNumber: { type: Sequelize.STRING(15), allowNull: false }
    },
    {
        ...basicModel.options
    }
)


module.exports = Users;