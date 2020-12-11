const { expect } = require("chai")
const { random, name, internet, phone, address } = require('faker')
const DatabaseHelper = require("../helper/test/databaseHelper")
// const database = new DatabaseHelper

const chaiHttp = require('chai-http')
const chai = require('chai')
const server = require('../server')
const Users = require("../models/Users")
const createdID = []
chai.use(chaiHttp)

// let db
// before(async () => {
//     db = await database.start()
// })

// after(async () => {
//     await database.drop()
// })

const userBody = {
    name: name.firstName() + name.lastName(),
    email: internet.email(),
    password: random.alphaNumeric(9),
    mobileNumber: phone.phoneNumber(),
    address: address.streetAddress(false),
    city: address.city(),
}

chai
    .request(server)
    .post('/users')
    .set('Authorization', `Bearer ${tokens.admin}`)
    .send(user)
    .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.include.keys(
            'id', 'name', 'email', 'password',
            'mobileNumber', 'address', 'city',
            'createdAt', 'updatedAt')
        createdID.push(res.body._id)
        done()
    })

describe(`
  __  __
/ / / / __ ___ ____
/ /_/(_ -</ -_) __ /
\\____ / ___ /\\__ / _ /
`, () => {
    describe('POST /auth/register', () => {
        it('Should able to register a new user', async () => {
            const user = await db['users'].create(userBody)
            expect(user.dataValues).has.property('id')
            expect(user.dataValues).has.property('name')
            expect(user.dataValues).has.property('email')
            expect(user.dataValues).has.property('password')
        })
    })
})

