const Sequelize = require('sequelize')
const basicModel = {}
basicModel.fields = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE }
}

basicModel.options = {
    timestamps: true,
    underscored: true,
}

module.exports = basicModel