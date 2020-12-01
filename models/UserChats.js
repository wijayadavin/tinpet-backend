const db = require('../configs/dbConnection')
const basicModel = require('./basicModel')


const UserChats = db.define(
    "userChats",
    {
        ...basicModel.fields,
    },
    {
        ...basicModel.options
    }
)


module.exports = UserChats;