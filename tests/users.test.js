const { expect } = require("chai")
const { random, name } = require('faker')
const DatabaseHelper = require("../helper/test/databaseHelper")
const database = new DatabaseHelper


// 
let db
before(async () => {
    db = await database.start()
})

after(async () => {
    await database.drop()
})

const user = {
    name: name.firstName() + name.lastName(),
    age: random.number(99),
    password: random.alphaNumeric(9)
}

describe("Model user", () => {
    it('should can add user', async () => {
        const user = await new db('users').add(userBody)
        expect(user.dataValues).has.property('id')
        expect(user.dataValues).has.property('name')
        expect(user.dataValues).has.property('email')
        expect(user.dataValues).has.property('password')
    })
})