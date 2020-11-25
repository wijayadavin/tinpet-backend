const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')


const users = db.define(
    "users",
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        mobile_number: { type: Sequelize.STRING }
    }
)

module.exports = users;