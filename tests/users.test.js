const { expect } = require("chai")
const { random, name, internet, phone, address } = require('faker')

const chaiHttp = require('chai-http')
const chai = require('chai')
const server = require('../server')
const Users = require("../models/Users")
const { checkPassword } = require("../helper/bcryptHelper");
const should = chai.should()
const createdID = []
chai.use(chaiHttp)


let userToken

// const dummyUserBody = {
//     email: 'davinblackz@gmail.com',
//     password: 'davin12345'
// }

const userBody = {
    name: name.firstName() + name.lastName(),
    email: internet.email(),
    password: random.alphaNumeric(9),
    mobileNumber: '08123456789',
    address: address.streetAddress(),
    city: 'Jakarta',
}

// setTimeout(() => { console.log("Start testing..."); }, 2000);
describe(`========= USERS =========`, () => {
    describe('Start server', () => {
        it('it should start the server', (done) => {
            setTimeout(() => done(), 220)
        })
    })
    describe('POST /auth/register', () => {
        it('Should able to register a new user', (done) => {
            chai
                .request(server)
                .post('/auth/register')
                .send(userBody)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.include.keys(
                        'id', 'name', 'email', 'password',
                        'mobileNumber', 'address', 'city',
                        'createdAt', 'updatedAt', 'token')
                    createdID.push(res.body.id)
                    done()
                })
        })
    })
    describe('POST /auth/login', () => {
        it('it should GET a token when logged in as a registered user', (done) => {
            chai
                .request(server)
                .post('/auth/login')
                .send({
                    email: userBody.email,
                    password: userBody.password
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('token')
                    userToken = res.body.token
                    done()
                })
        })
    })
    describe('GET /user', () => {
        it('it should get all users data', done => {
            chai
                .request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
        it('it should get a user data by id', done => {
            const id = createdID.slice(-1).pop()
            chai
                .request(server)
                .get(`/user/${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys(
                        'id', 'name', 'address', 'city',
                        'imageUrl', 'createdAt', 'updatedAt')
                    done()
                })
        })
        it('it should be 404 error, since the user id was not found', done => {
            chai
                .request(server)
                .get(`/user/${random.uuid()}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })
    describe('GET /profile', () => {
        it('it should NOT be able to get user profile since no token was sent', (done) => {
            chai
                .request(server)
                .get('/profile')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it(`it should GET the user's profile by token`, (done) => {
            chai
                .request(server)
                .get('/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys(
                        'id', 'name', 'email', 'password',
                        'mobileNumber', 'address', 'city',
                        'userImage', 'createdAt', 'updatedAt')
                    res.body.userImage.should.include.keys(
                        'url')
                    done()
                })
        })
    })
    describe('PATCH /profile', () => {
        it('it should NOT be able to patch user profile since no token was sent', (done) => {
            chai
                .request(server)
                .patch('/profile')
                .send({
                    name: name.firstName() + name.lastName(),
                    email: internet.email(),
                    password: random.alphaNumeric(9),
                    mobileNumber: '08123456789',
                    address: address.streetAddress(),
                    city: 'Bandung',
                })
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it(`it should EDIT the user's profile by token`, (done) => {
            const id = createdID.slice(-1).pop()
            const newUserBody = {
                name: 'editedName',
                email: 'editedEmail@email.com',
                password: 'editedPassword123',
                mobileNumber: '08987654321',
                address: 'editedStreetAddress',
                city: 'Bandung',
            }
            chai
                .request(server)
                .patch('/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newUserBody)
                .end((err, res) => {
                    res.body.password = checkPassword(res.body.password, newUserBody.password)
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('id').eql(id)
                    res.body.should.have.property('name').eql(newUserBody.name)
                    res.body.should.have.property('email').eql(newUserBody.email)
                    res.body.should.have.property('password').eql(true)
                    res.body.should.have.property('mobileNumber').eql(newUserBody.mobileNumber)
                    res.body.should.have.property('address').eql(newUserBody.address)
                    res.body.should.have.property('city').eql(newUserBody.city)
                    done()
                })
        })
    })
    after(() => {
        console.log('Deleting user test data ...')
        createdID.forEach((id) => {
            Users.destroy({ where: { id: id } }, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })
    })
})