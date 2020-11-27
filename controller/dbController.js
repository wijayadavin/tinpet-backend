const _ = require('lodash')
const humps = require('humps')
const { v4: uuidv4 } = require('uuid')
const getModel = require('../helper/getModelHelper')


class Controller {
    /**
     * Controller untuk mengolah database mysql.
     * 
     * Contoh 01:
     *
     *      const result = await new Controller('users').getAll()
     *
     * Contoh 02:
     *
     *      const result = await new Controller('users').get({ id: req.params.id })
     * @property getAll, get, add, edit, atau remove
     * @param {String} tableName nama table yang ingin diproses, berupa string
     */
    constructor(tableName) {
        // Mencari nama model yang ingin di pakai dan masukan ke this.model:
        this.model = getModel(tableName)

    }


    /**
     * Contoh untuk mengambil semua data dari table users:
     * 
     *      const result = await new Controller('users').getAll()
     * 
     * @return {Object} data-data yang ditemukan
     */
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


    /**
     * 
     * Contoh untuk mengambil sebuah data dari table users yang memiliki id = req.user.id:
     *
     *      const result = await new Controller('users').get({ id: req.params.id })
     * 
     *
     * Contoh untuk mengambil sebuah data dari table users dengan name = req.body.name:
     *
     *      const result = await new Controller('users').get({ name: req.body.name })
     * 
     * 
     * @param {Object} searchParameters Parameter yang dicari
     * @return {Object} data yang ditemukan
     */
    async get(searchParameters) {
        const result = await this.model.findOne({
            where: searchParameters
        })
        const plainObject = _.toPlainObject(result)

        return humps.camelizeKeys(plainObject)['dataValues']
    }


    async getJoinLeft(searchParameters, joinedTableName) {
        const result = await this.model.findAll({
            include: {
                model: getModel(joinedTableName),
                required: false,
                where: searchParameters
            }
        })
        const plainObject = _.toPlainObject(result)

        return humps.camelizeKeys(plainObject)['dataValues']
    }


    /**
     *
     * Contoh untuk menambah data pada table users dengan data = req.body:
     *
     *      const result = await new Controller('users').add(req.body)
     *
     * @param {Object} body data yang akan dimasukan
     * @return {Object} data yang ditemukan
     */
    async add(body) {
        body.id = uuidv4()
        const result = await new this.model(
            humps.decamelizeKeys(body)
        ).save()

        return humps.camelizeKeys(result)['dataValues']
    }


    /**
     * Contoh untuk mengedit sebuah data pada table users yang memiliki id = req.params.id dengan data = req.body:
     *
     *      const result = await new Controller('users').edit(req.params.id, req.body)
     *
     * @param {String} id id dari data yang ingin diedit
     * @param {Object} body data baru yang ingin di update
     * @return {Object} data yang diupdate
     */
    async edit(id, body) {
        const foundData = await this.model.findOne({ where: { id: id } })
        let updated = Object.assign(foundData, humps.decamelizeKeys(body))
        const result = await updated.save()

        return result
    }


    /**
     * Contoh untuk menghapus sebuah data pada table users yang memiliki id = req.params.id:
     *
     *      const result = await new Controller('users').remove(req.params.id)
     *
     * @param {String} id  id dari data yang ingin dihapus
     * @return {0|1} 0(false) kalau gagal, and 1(true) kalau berhasil
     */
    async remove(id) {
        const result = await this.model
            .destroy({ where: { id: id } })

        return result
    }
}


module.exports = Controller