const Sequelize = require('sequelize')
const basicModel = {}
basicModel.fields = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    createdAt: { type: Sequelize.DATE, field: 'created_at' },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}

basicModel.options = {
    timestamps: true,
    underscored: true,
}

module.exports = basicModel