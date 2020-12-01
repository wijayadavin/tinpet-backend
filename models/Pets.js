const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const basicModel = require('../models/basicModel')


const Pets = db.define(
    "pets",
    {
        ...basicModel.fields,
        name: { type: Sequelize.STRING, allowNull: false },
        type: { type: Sequelize.STRING, allowNull: false },
        age: { type: Sequelize.INTEGER },
        gender: { type: Sequelize.STRING, allowNull: false, defaultValue: "male" },
        address: { type: Sequelize.STRING, allowNull: false },
        city: { type: Sequelize.STRING, allowNull: false },
        breed: { type: Sequelize.STRING },
        isMatched: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    },
    {
        ...basicModel.options
    }
)


module.exports = Pets;