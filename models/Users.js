const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const { v4: uuidv4 } = require('uuid');
const basicModel = require('./basicModel')


const Users = db.define(
    "users",
    {
        ...basicModel.fields,
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        mobileNumber: { type: Sequelize.STRING, field: "mobile_number" }
    },
    {
        ...basicModel.options
    }
)


module.exports = Users;