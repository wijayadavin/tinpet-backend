const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const { v4: uuidv4 } = require('uuid');

const users = db.define(
    "users",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        mobile_number: { type: Sequelize.STRING }
    }
)

module.exports = users;