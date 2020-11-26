const Sequelize = require('sequelize')
const { v4 } = require('uuid')
const db = require('../configs/dbConnection')

const photo = db.define(
    "photo",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: v4,
        },
        imageUrl: { type: Sequelize.STRING },
        user_id: { type: Sequelize.STRING, }
    }
)
