const { expect } = require("chai")
const { random, name, internet, phone, address } = require('faker')

const chaiHttp = require('chai-http')
const chai = require('chai')
const server = require('../server')
const Users = require("../models/Users")
const createdID = []
chai.use(chaiHttp)
const should = chai.should()

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
    mobileNumber: '08123456789',
    address: address.streetAddress(),
    city: 'Jakarta',
}


describe(`========= USERS =========`, () => {
    describe('POST /auth/register', () => {
        it('Should able to register a new user', (done) => {
            chai
                .request(server)
                .post('/auth/register')
                .send(userBody)
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
        })
    })
    after(() => {
        createdID.forEach((id) => {
            Users.destroy({ where: { id: id } }, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })
    })
})