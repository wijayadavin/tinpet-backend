const sequalize = require('sequalize')
const db = require('../configs/dbConnection')
const basicModel = require('./basicModel')


const UserChats = db.define(
    "userChats",
    {
        ...basicModel.fields,
        time: { type: sequalize.STRING, allowNull: false },
        location: { type: sequalize.STRING, allowNull: false },
        status: { type: sequalize.STRING, allowNull: false, defaultValue: "requested" },
        message: { type: sequalize.STRING, allowNull: false, defaultValue: "type your message here" }
    },
    {
        ...basicModel.options
    }
)


module.exports = UserChats;