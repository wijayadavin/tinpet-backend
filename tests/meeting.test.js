const { random } = require('faker')
const chaiHttp = require('chai-http')
const chai = require('chai')
const server = require('../server')
const db = require('../models')
const scriptNameHelper = require('../helper/scriptNameHelper')
const should = chai.should() // don't delete this (needed for test!)
let createdId = { meetings: [], userNotifications: [], userChatLines: [] }
chai.use(chaiHttp)


let senderUserToken
let recipientUserId
let recipientPet

// const dummyUserBody = {
//     email: 'davinblackz@gmail.com',
//     password: 'davin12345'
// }

const senderUserCredentials = {
    email: 'wijayadavin@gmail.com',
    password: 'davin12345',
}

const recipientUserCredentials = {
    email: 'davinblackz@gmail.com',
    password: 'davin12345',
}


describe(`========= Meetings =========`, () => {
    describe('Start server', () => {
        it('it should start the server', (done) => {
            setTimeout(() => done(), 220)
        })
    })
    describe('Data preparation', () => {
        it(`it should GET senderUser's token `, (done) => {
            chai
                .request(server)
                .post('/auth/login')
                .send(senderUserCredentials)
                .end((err, res) => {
                    res.should.have.status(200)
                    senderUserToken = res.body.token
                    done()
                })
        })
        it('it should GET the recipientUserId', (done) => {
            chai
                .request(server)
                .post('/auth/login')
                .send(recipientUserCredentials)
                .end((err, res) => {
                    res.should.have.status(200)
                    recipientUserId = res.body.id
                    done()
                })
        })
        it('it should GET pet data by the recipientUserId', (done) => {
            chai
                .request(server)
                .get(`/pet?userId=${recipientUserId}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    recipientPet = res.body.slice(-1).pop()
                    done()
                })
        })
    })
    describe('POST /meeting', () => {
        it('it should created a new meeting data and send email', (done) => {
            chai
                .request(server)
                .post(`/meeting`)
                .set('Authorization', `Bearer ${senderUserToken}`)
                .send({
                    recipientPetId: recipientPet.id,
                    date: "10-10-2021",
                    hour: "10:10",
                    location: "City town hall",
                    text: "Hi!, let's meet"
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys(
                        'meeting', 'senderNotif', 'recipientNotif',
                        'chatLine', 'recipientEmailNotif')
                    res.body.recipientEmailNotif.should.be.an('object')
                    createdId.meetings.push(res.body.meeting.id)
                    createdId.userNotifications.push(res.body.senderNotif.id, res.body.recipientNotif.id)
                    createdId.userChatLines.push(res.body.chatLine.id)
                    done()
                })
        })
        it('it should returned 401 ERROR, since no token was sent', (done) => {
            chai
                .request(server)
                .post(`/meeting`)
                .send({
                    recipientPetId: recipientPet.id,
                    date: "10-10-2021",
                    hour: "10:10",
                    location: "City town hall",
                    text: "Hi!, let's meet"
                })
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should returned 404 ERROR, since the pet ID was not found', (done) => {
            chai
                .request(server)
                .post(`/meeting`)
                .set('Authorization', `Bearer ${senderUserToken}`)
                .send({
                    recipientPetId: random.uuid(),
                    date: "10-10-2021",
                    hour: "10:10",
                    location: "City town hall",
                    text: "Hi!, let's meet"
                })
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
        it('it should returned 400 ERROR, since the format is invalid', (done) => {
            chai
                .request(server)
                .post(`/meeting`)
                .set('Authorization', `Bearer ${senderUserToken}`)
                .send({
                    recipientPetId: recipientPet.id
                })
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
    // describe('GET /meeting', () => {
    //     it('it should returned 404 ERROR since the meeting data was not found', (done) => {
    //     })
    //     it('it should returned 401 ERROR since the token was not sent', (done) => {
    //     })
    //     it(`it should GET user's meeting data`, (done) => {
    //     })
    // })
    after(() => {
        console.log('Cleaning test data ...')
        Object.keys(createdId).forEach((tableName) => {
            createdId[tableName].forEach((id) => {
                db[tableName].destroy({ where: { id: id } }, (err, res) => {
                    if (err) {
                        console.log(err)
                    }
                })
                console.log(`${tableName} test data ${id} was successfully deleted!`)
            })
        })
        console.log(`${scriptNameHelper} Test completed!`)
    })
})