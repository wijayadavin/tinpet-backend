const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
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