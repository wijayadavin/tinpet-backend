const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const getModel = require('../models')
const humps = require('humps')
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
     * 
     * @property getAll, get, add, edit, atau remove
     * @param {String} tableName nama table yang ingin diproses, berupa string
     */
    constructor(pluralTableName) {
        // Mencari nama model yang ingin di pakai dan masukan ke this.model:
        this.model = getModel(pluralTableName)
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
        return result
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
        }).catch((err) => {
            throw err
        })
        return result
    }


    async getJoinLeft(searchParameters, joinedTableNames) {
        // kalau variable joinedTableNames bukan Array, maka jadikan array:
        if (typeof joinedTableNames == 'string') {
            joinedTableNames = [joinedTableNames]
        }
        // jadikan class model sequelize:
        joinedTableNames = joinedTableNames.map(getModel)

        // lakukan pencarian dengan sequelize:
        let result = await this.model.findOne({
            where: searchParameters,
            include: [
                ...joinedTableNames
            ]
        }).catch((err) => {
            throw err
        })

        return result
    }


    async getAllJoinLeft(joinedTableNames) {
        // kalau variable joinedTableNames bukan Array, maka jadikan array:
        if (typeof joinedTableNames == 'string') {
            joinedTableNames = [joinedTableNames]
        }
        // jadikan class model sequelize:
        joinedTableNames = joinedTableNames.map(getModel)

        // lakukan pencarian dengan sequelize:
        let result = await this.model.findAll({
            include: [
                ...joinedTableNames
            ]
        }).catch((err) => {
            throw err
        })

        return result
    }


    /**
     *
     * Contoh untuk menambah data pada table users dengan data = req.body:
     *
     *      const result = await new Controller('users').add(req.body)
     *
     * @param {Object} body data yang akan dimasukan, keys boleh menggunakan camel/snake case.
     * @return {Object} data yang ditemukan
     */
    async add(body) {
        body.id = uuidv4()
        const result = await new this.model(
            body
        ).save().catch((err) => {
            throw err
        })

        return result['dataValues']
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
            .catch((err) => {
                throw err
            })
        let updated = Object.assign(foundData, body)
        const result = await updated
            .save().catch((err) => {
                throw err
            })

        return result['dataValues']
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
            .catch((err) => {
                throw err
            })

        return result
    }
}


module.exports = Controller