const { expect } = require("chai")
const { random, name, internet, phone, address } = require('faker') // faker untuk memasukkan random email, dll seperti postman

const chaiHttp = require('chai-http')
const chai = require('chai')
const server = require('../server')
const db = require("../models")
const { url } = require("inspector")
const should = chai.should()
let createdId = { users: [], pets: [] }  // [] -> membuat variabel array 
let userToken

chai.use(chaiHttp)

const userBody = {
    name: name.firstName() + name.lastName(),
    email: internet.email(),
    password: random.alphaNumeric(9),
    mobileNumber: '08123456789',
    address: address.streetAddress(),
    city: 'Jakarta',
}

const petBody = {
    name: name.firstName() + name.lastName(),
    age: 1,
    gender: 'female',
    type: 'dog',
    address: address.streetAddress(),
    city: 'Jakarta',
    breed: 'chihuahua'
}

const petImages = {
    file: 'url',
    type: 'cat',
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
        it('it should able to register a new user', (done) => {
            chai //melakukan test request
                .request(server) //menjalankan server
                .post('/auth/register') //menentukan metode & rute tujuan
                .send(userBody) //mengirimkan data body
                .end((err, res) => { //mengirimkan request & mengambil data respond
                    res.should.have.status(201) //respond harus memiliki status 201
                    res.body.should.be.an('object') //respond body harus berbentuk objek
                    res.body.should.include.keys( //respond body harus termasuk keys :
                        'id', 'name', 'email', 'password',
                        'mobileNumber', 'address', 'city',
                        'createdAt', 'updatedAt', 'token')

                    createdId.users.push(res.body.id) //memasukkan ID user yang berhasil dibuat
                    done() //mengakhiri testing
                })
        })
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
    describe('POST /pet', () => {
        it('it should created a new pet data', (done) => {
            chai
                .request(server)
                .post('/pet')
                .set('Authorization', `Bearer ${userToken}`)
                .send(petBody)
                .end((err, res) => {
                    createdId.pets.push(res.body.pet.id) //memasukkan ID pet yang berhasil dibuat
                    const id = createdId.pets.slice(-1).pop() // mengambil satu buah ID -> dimasukkan ke dalam variabel ID

                    res.should.have.status(201)
                    res.body.pet.should.be.an('object')

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
                        'id', 'name', 'age', 'gender', 'type', 'address', 'city', 'breed'
                    )



                    // test data res.body.petImage:
                    res.body.pet.should.have.property('id').eql(id)
                    res.body.pet.should.have.property('gender').eql(petBody.gender)
                    res.body.pet.should.have.property('type').eql(petBody.type)
                    res.body.pet.should.include.keys(
                        'id', 'type', 'breed'
                    )

                    done()
                })
        })

    })
    after(() => {
        console.log('Cleaning test data ...')
        Object.keys(createdId).forEach((tableName) => { //menghapus semua ID yang sudah di create dengan testingan ini
            createdId[tableName].forEach((id) => {
                db[tableName].destroy({ where: { id: id } },
                    (err, res) => { if (err) { console.log(err) } })
                console.log(`${tableName} test data ${id} was successfully deleted!`)
            })
        })
        console.log('Test completed!')
    })
}) 