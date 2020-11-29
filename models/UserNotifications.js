const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const basicModel = require('./basicModel')


const UserNotifications = db.define(
    "useNotifications",
    {
        ...basicModel.fields,
        text: { type: Sequelize.STRING, allowNull: false },
        url: { type: Sequelize.STRING, allowNull: false },
        read: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
    },
    {
        ...basicModel.options
    }
)


module.exports = UserNotifications;