
const pluralize = require('pluralize')

module.exports = (singularTableName) => {
    singularTableName = singularTableName.replace("-", "_")
    return pluralize.plural(singularTableName)
}