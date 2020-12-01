// "use strict" mengubah bad syntax jadi error, terutama untuk meningkatkan security:
"use strict";
// Mencari nama model yang ingin di pakai:
const readDir = require('read-dir-deep')
const path = require('path')
const humps = require('humps')
const allModelPaths = readDir.readDirDeepSync(
    path.join(
        path.resolve(),
        'models'
    )
)


module.exports = (tableName) => {
    tableName = humps.decamelize(tableName)
    tableName = humps.depascalize(tableName)
    let result = {}
    allModelPaths.forEach((modelFilePath) => {
        if (tableName == humps.depascalize(path.parse(modelFilePath).name)) {
            result = require(`../${modelFilePath}`)
        }
    })
    return result
}