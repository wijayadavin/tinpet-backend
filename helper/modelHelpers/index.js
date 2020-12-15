const db = require('../../models');
const humps = require('humps')


module.exports = function getModel(pluralTableName) {
    const parsedPluralTableName = humps.camelize(pluralTableName)
    return db[parsedPluralTableName]
}