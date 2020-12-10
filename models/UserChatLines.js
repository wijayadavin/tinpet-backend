const Sequelize = require('sequelize')
const db = require('../config/dbConnection')
const basicModel = require('./basicModel')


const UserChatLines = db.define(
    "userChatLines",
    {
        ...basicModel.fields,
        text: { type: Sequelize.STRING }
    },
    {
        ...basicModel.options
    }
)


module.exports = UserChatLines;