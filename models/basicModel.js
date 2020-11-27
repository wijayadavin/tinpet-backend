const basicModel = {}
basicModel.field = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    }
}

basicModel.option = {
    underscored: true
}

module.exports = basicModel