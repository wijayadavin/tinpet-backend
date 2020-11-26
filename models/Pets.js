const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')

const Pets = db.define(
    "pets",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        name: { type: Sequelize.STRING, allowNull: false },
        type: { type: Sequelize.STRING, allowNull: false },
        age: { type: Sequelize.INTEGER },
        gender: { type: Sequelize.STRING, allowNull: false, defaultValue: "male" },
        address: { type: Sequelize.STRING, allowNull: false },
        city: { type: Sequelize.STRING, allowNull: false },
        breed: { type: Sequelize.STRING },
        matched: { type: Sequelize.STRING, allowNull: false, defaultValue: "available" }
    }
)

module.exports = Pets;