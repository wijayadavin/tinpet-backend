// Mencari nama model yang ingin di pakai:
const readDir = require('read-dir-deep')
const path = require('path')
const allModelPaths = readDir.readDirDeepSync(
    path.join(
        path.resolve(),
        'models'
    )
)
const humps = require('humps')


module.exports = (tableName) => {
    let result = {}
    allModelPaths.forEach((modelFilePath) => {
        if (tableName == humps.depascalize(path.parse(modelFilePath).name)) {
            result = require(`../${modelFilePath}`)
        }
    })
    return result
}