const db = require('../../models');
const humps = require('humps')


module.exports = function getModel(pluralTableName) {
    pluralTableName = humps.pascalize(pluralTableName)
    return db[pluralTableName]
}