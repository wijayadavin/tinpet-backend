const { expect } = require("chai")
const { random, name, internet, phone, address } = require('faker') // faker untuk memasukkan random email, dll seperti postman

const chaiHttp = require('chai-http')
const chai = require('chai')
const server = require('../server')
const db = require("../models")
const { url } = require("inspector")
const scriptNameHelper = require("../helper/scriptNameHelper")
const should = chai.should()
let createdId = { users: [], pets: [], petComments: [] }  // [] -> membuat variabel array 
let userToken = []

chai.use(chaiHttp)

const petBody = {
    name: name.firstName() + name.lastName(),
    age: 1,
    gender: 'female',
    type: 'dog',
    address: address.streetAddress(),
    city: 'Jakarta',
    breed: 'chihuahua'
}

// setTimeout(() => { console.log("Start testing..."); }, 2000);
describe(`========= USERS =========`, () => {
    describe('Start server', () => {
        it('it should start the server', (done) => {
            setTimeout(() => done(), 220)
        })
    })
    describe('data preparation', () => {
        it('it should able to register the first user', (done) => {
            chai //melakukan test request
                .request(server) //menjalankan server
                .post('/auth/register') //menentukan metode & rute tujuan
                .send({
                    name: name.firstName() + name.lastName(),
                    email: internet.email(),
                    password: random.alphaNumeric(9),
                    mobileNumber: '08123456789',
                    address: address.streetAddress(),
                    city: 'Jakarta',
                }) //mengirimkan data body
                .end((err, res) => { //mengirimkan request & mengambil data respond
                    res.should.have.status(201) //respond harus memiliki status 201
                    res.body.should.be.an('object') //respond body harus berbentuk objek
                    res.body.should.include.keys( //respond body harus termasuk keys :
                        'id', 'name', 'email', 'password',
                        'mobileNumber', 'address', 'city',
                        'createdAt', 'updatedAt', 'token')

                    createdId.users.push(res.body.id) //memasukkan ID user yang berhasil dibuat
                    userToken.push(res.body.token)
                    done() //mengakhiri testing
                })
        })
        it('it should able to register the second user', (done) => {
            chai //melakukan test request
                .request(server) //menjalankan server
                .post('/auth/register') //menentukan metode & rute tujuan
                .send({
                    name: name.firstName() + name.lastName(),
                    email: internet.email(),
                    password: random.alphaNumeric(9),
                    mobileNumber: '08123456789',
                    address: address.streetAddress(),
                    city: 'Jakarta',
                }) //mengirimkan data body
                .end((err, res) => { //mengirimkan request & mengambil data respond
                    res.should.have.status(201) //respond harus memiliki status 201
                    res.body.should.be.an('object') //respond body harus berbentuk objek
                    res.body.should.include.keys( //respond body harus termasuk keys :
                        'id', 'name', 'email', 'password',
                        'mobileNumber', 'address', 'city',
                        'createdAt', 'updatedAt', 'token')

                    createdId.users.push(res.body.id) //memasukkan ID user yang berhasil dibuat
                    userToken.push(res.body.token)
                    done() //mengakhiri testing
                })
        })

    })
    describe('POST /pet', () => {
        it('it should created a new pet data', (done) => {
            chai
                .request(server)
                .post('/pet')
                .set('Authorization', `Bearer ${userToken.slice(-1).pop()}`)
                .send(petBody)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.pet.should.be.an('object')

                    createdId.pets.push(res.body.pet.id) //memasukkan ID pet yang berhasil dibuat
                    const id = createdId.pets.slice(-1).pop() // mengambil satu buah ID -> dimasukkan ke dalam variabel ID

                    // test data res.body.pet:
                    res.body.pet.should.have.property('id').eql(id)
                    res.body.pet.should.have.property('name').eql(petBody.name)
                    res.body.pet.should.have.property('age').eql(petBody.age)
                    res.body.pet.should.have.property('gender').eql(petBody.gender)
                    res.body.pet.should.have.property('type').eql(petBody.type)
                    res.body.pet.should.have.property('address').eql(petBody.address)
                    res.body.pet.should.have.property('city').eql(petBody.city)
                    res.body.pet.should.have.property('breed').eql(petBody.breed)
                    res.body.pet.should.include.keys(
                        'createdAt', 'updatedAt'
                    )

                    // test data res.body.petImage:
                    res.body.pet.should.have.property('id').eql(id)
                    res.body.pet.should.have.property('gender').eql(petBody.gender)
                    res.body.pet.should.have.property('type').eql(petBody.type)
                    res.body.pet.should.include.keys(
                        'createdAt', 'updatedAt'
                    )
                    done()
                })
        })

    })
    describe('POST pet/:petId/comment', () => {
        it('it should created a new comment "comment1"', (done) => {
            chai
                .request(server)
                .post(`/pet/${createdId.pets.slice(-1).pop()}/comment`)
                .set('Authorization', `Bearer ${userToken.slice(-1).pop()}`)
                .send({ text: 'comment1' })
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')

                    createdId.petComments.push(res.body.id)
                    const id = createdId.petComments.slice(-1).pop()
                    const userId = createdId.users.slice(-1).pop()
                    const petId = createdId.pets.slice(-1).pop()

                    // test data res.body.pet:
                    res.body.should.have.property('id').eql(id)
                    res.body.should.have.property('userId').eql(userId)
                    res.body.should.have.property('text').eql('comment1')
                    res.body.should.have.property('petId').eql(petId)
                    res.body.should.include.keys(
                        'createdAt', 'updatedAt'
                    )

                    done()
                })
        })
        it('it should created a new comment "comment2"', (done) => {
            chai
                .request(server)
                .post(`/pet/${createdId.pets.slice(-1).pop()}/comment`)
                .set('Authorization', `Bearer ${userToken.slice(-1).pop()}`)
                .send({ text: 'comment2' })
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')

                    createdId.petComments.push(res.body.id)
                    const id = createdId.petComments.slice(-1).pop()
                    const userId = createdId.users.slice(-1).pop()
                    const petId = createdId.pets.slice(-1).pop()
                    // test data res.body.pet:
                    res.body.should.have.property('id').eql(id)
                    res.body.should.have.property('userId').eql(userId)
                    res.body.should.have.property('text').eql('comment2')
                    res.body.should.have.property('petId').eql(petId)
                    res.body.should.include.keys(
                        'createdAt', 'updatedAt'
                    )
                    done()
                })
        })
        it('it should created a new comment "comment3"', (done) => {
            chai
                .request(server)
                .post(`/pet/${createdId.pets.slice(-1).pop()}/comment`)
                .set('Authorization', `Bearer ${userToken.slice(-1).pop()}`)
                .send({ text: 'comment3' })
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')

                    createdId.petComments.push(res.body.id)
                    const id = createdId.petComments.slice(-1).pop()
                    const userId = createdId.users.slice(-1).pop()
                    const petId = createdId.pets.slice(-1).pop()
                    // test data res.body.pet:
                    res.body.should.have.property('id').eql(id)
                    res.body.should.have.property('userId').eql(userId)
                    res.body.should.have.property('text').eql('comment3')
                    res.body.should.have.property('petId').eql(petId)
                    res.body.should.include.keys(
                        'createdAt', 'updatedAt'
                    )
                    done()
                })
        })
        it('it should updated the commentCount', (done) => {
            chai
                .request(server)
                .get(`/pet/${createdId.pets.slice(-1).pop()}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('commentCount').eql(3)
                    done()
                })
        })

    })

    describe('POST pet/:petId/like', () => {
        it('it should send like from the first user', (done) => {
            chai
                .request(server)
                .post(`/pet/${createdId.pets.slice(-1).pop()}/like`)
                .set('Authorization', `Bearer ${userToken[0]}`)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    done()
                })
        })
        it('it should send like from the second user', (done) => {
            chai
                .request(server)
                .post(`/pet/${createdId.pets.slice(-1).pop()}/like`)
                .set('Authorization', `Bearer ${userToken[1]}`)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    done()
                })
        })
        it('it should updated the likeCount', (done) => {
            chai
                .request(server)
                .get(`/pet/${createdId.pets.slice(-1).pop()}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('likeCount').eql(2)
                    done()
                })
        })
        it('it should send dislike from the first user', (done) => {
            chai
                .request(server)
                .post(`/pet/${createdId.pets.slice(-1).pop()}/like`)
                .set('Authorization', `Bearer ${userToken[0]}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    done()
                })
        })
        it('it should send dislike from the second user', (done) => {
            chai
                .request(server)
                .post(`/pet/${createdId.pets.slice(-1).pop()}/like`)
                .set('Authorization', `Bearer ${userToken[1]}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    done()
                })
        })
    })
    after(() => {
        console.log('Cleaning test data ...')
        console.log({ createdData: createdId })
        Object.keys(createdId).forEach(tableName => { //menghapus semua ID yang sudah di create dengan testingan ini
            createdId[tableName].map(id => {
                db[tableName].destroy({ where: { id: id } }, (err, res) => {
                    if (err) { console.error(err) }
                })
                console.log(`${tableName} ${id} was deleted`)
            })

        }
        )
    })
    console.log(`${scriptNameHelper(__filename)} Test completed!`)
})