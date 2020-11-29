const Sequelize = require('sequelize')
const db = require('../configs/dbConnection')
const basicModel = require('./basicModel')


const PetMeetings = db.define(
    "pet_meetings",
    {
        ...basicModel.fields,
        time: { type: Sequelize.STRING, allowNull: false },
        location: { type: Sequelize.STRING, allowNull: false },
        status: { type: Sequelize.STRING, allowNull: false, defaultValue: "requested" }
    },
    {
        ...basicModel.options
    }
)


module.exports = PetMeetings;