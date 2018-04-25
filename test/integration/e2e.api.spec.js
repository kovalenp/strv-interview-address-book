'use strict'

const request = require('supertest-koa-agent')
const mongo = require('../../src/database/mongo')
const firebase = require('../../src/database/firebase')
const testData = require('../utils/test-data')
const app = require('../../src/api')

describe('End to End integration test', () => {
  let testToken = ''

  before(async () => {
    await mongo.init()
    firebase.initAdmin()
    firebase.initClient()
  })

  after(() => {
    mongo.close()
  })

  it('Should register a new user', async () => {
    const testUser = testData.user()
    const response = await request(app)
      .post('/register')
      .send(testUser)
      .expect(200)
    testToken = response.body.token
  })

  it('Should post a new contact', async () => {
    const testContact = testData.contact()
    await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${testToken}`)
      .send(testContact)
      .expect(201)
  })
})
