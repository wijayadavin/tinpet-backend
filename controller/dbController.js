const _ = require('lodash')
const humps = require('humps')
const readDir = require('read-dir-deep')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const allModelPaths = readDir.readDirDeepSync(
    path.join(
        path.resolve(),
        'models'
    )
)

class Controller {
    constructor(tableName) {
        this.tableName = tableName

        // Mencari nama model yang ingin di pakai:
        allModelPaths.forEach((modelFilePath) => {
            if (tableName == humps.depascalize(path.parse(modelFilePath).name)) {
                this.model = require(`../${modelFilePath}`)
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
        return humps.camelizeKeys(result)['dataValues']
    }

    async edit(id, body) {
        const foundData = await this.model.findOne({ where: { id: id } })
        let updated = Object.assign(foundData, body)
        const result = await updated.save()

        return result
    }

    // async remove(id) {
    //     const result = await db(this.tableName)
    //         .delete()
    //         .where({ id })
    //         .catch((err) => {
    //             throw err
    //         })
    //     return result
    // }
}


module.exports = Controller