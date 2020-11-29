const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')

const pets = db.define(
    "pets",
    {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        name: { type: Sequelize.STRING, allowNull: false },
        type: { type: Sequelize.STRING, allowNull: false },
        age: { type: Sequelize.INTEGER },
        gender: { type: Sequelize.STRING, allowNull: false, defaultValue: "male" },
        address: { type: Sequelize.STRING, allowNull: false },
        city: { type: Sequelize.STRING, allowNull: false },
        breed: { type: Sequelize.STRING },
        matched: { type: Sequelize.STRING, allowNull: false, defaultValue: "available" },
        user_id: { type: Sequelize.STRING, allowNull: false },
    }
)

module.exports = pets;
