const { random } = require('faker')

const exec = require('child_process').exec
function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error)
                reject({ error, stderr })
            else
                resolve({ stdout })
        })
    })
}

class DatabaseHelper {
    constructor() {
        this.dbName = random.alphaNumeric(10)
    }
    async start() {
        // sync and seed process:
        process.env.MYSQL_DATABASE = this.dbName
        const db = require('../../models')
        await execute('sequelize db:create')
        await execute('sequelize db:migrate')
        return db
    }
    async drop() {
        process.env.MYSQL_DATABASE = this.dbName
        await execute('sequelize db:drop')
    }
}

module.exports = DatabaseHelper