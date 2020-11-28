const pluralize = require('pluralize')


/**
 * Sequelize join helper:
 * digunakan pada hasil join dari sequelize
 * 
 * Contoh:
 * 
 *      result = sequelizeJoinHelper(result, "user_images")
 * 
 * @param {object} sequelizeJoinedResult Object hasil dari sequelize join
 * @param {string} joinedTableName string nama table yang telah dijoinkan tadi
 * @return {object} object yang sudah di flatten-kan
 */
module.exports = (sequelizeJoinedResult, joinedTableName) => {
    const singularTableName = pluralize.singular(joinedTableName)
    // Ratakan(flatten) object tingkat kedua:
    sequelizeJoinedResult['dataValues'][singularTableName] =
        sequelizeJoinedResult['dataValues'][singularTableName]['dataValues']

    // Copy kedalam object tingkat pertama:
    sequelizeJoinedResult = {
        ...sequelizeJoinedResult['dataValues'],
        ...sequelizeJoinedResult['dataValues'][singularTableName],
    }
    // Hapus object tingkat kedua:
    delete sequelizeJoinedResult['dataValues'][singularTableName]

    // return data yang sudah flatten:
    return sequelizeJoinedResult
}