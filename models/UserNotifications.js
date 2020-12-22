const Sequelize = require('sequelize')
const db = require('../config/dbConnection')
const basicModel = require('./basicModel')


const UserNotifications = db.define(
    "userNotifications",
    {
        ...basicModel.fields,
        text: { type: Sequelize.STRING, allowNull: false },
        url: { type: Sequelize.STRING, allowNull: false },
        read: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
        imageUrl: { type: Sequelize.STRING, allowNull: false }
    },
    {
        ...basicModel.options
    }
)


module.exports = UserNotifications;