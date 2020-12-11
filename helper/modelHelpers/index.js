const db = require('../../models');
const humps = require('humps')


module.exports = function getModel(pluralTableName) {
    pluralTableName = humps.camelize(pluralTableName)
    return db[pluralTableName]
}