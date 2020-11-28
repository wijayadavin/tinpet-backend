const { v4: uuidv4 } = require('uuid');
const _ = require('lodash')
const humps = require('humps')
const readDir = require('read-dir-deep');
const path = require('path')
const modelsFilePath = readDir.readDirDeepSync(
    path.join(
        path.resolve(),
        'models'
    )
)


class Controller {
    constructor(tableName) {
        this.tableName = tableName

        modelsFilePath.forEach((filePath) => {
            if (tableName == path.parse(filePath).name) {
                this.model = require(`../${filePath}`)
            }
        })
    }


    async getAll() {
        const result = await this.model.findAll({})
            .catch((err) => {
                throw err
            })

        return result.map(res => {
            const plainObject = _.toPlainObject(res)
            const camelCaseObject = humps.camelizeKeys(plainObject)
            return camelCaseObject['dataValues']
        })
    }

    async get(searchParameters) {
        const result = await this.model.findOne({
            where: searchParameters
        })
        const plainObject = _.toPlainObject(result)
        return humps.camelizeKeys(plainObject)['dataValues']
    }

    async add(body) {
        body.id = uuidv4()
        const result = await new this.model(
            humps.decamelizeKeys(body)
        ).save()
        return humps.camelizeKeys(result)
    }

    async edit(id, body) {
        const foundData = await this.model.findOne({ where: { id: id } })
        let updated = Object.assign(foundData, body)
        const result = await updated.save()

        return result
    }
}


module.exports = Controller