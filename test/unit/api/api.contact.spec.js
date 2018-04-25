'use strict'

const request = require('supertest-koa-agent')
const { expect } = require('chai')
const testData = require('../../utils/test-data')
const app = require('../../../src/api')


describe('POST /contact request validation', () => {
  it('Fails for payload without address', async () => {
    const testContact = testData.contactWithoutAddress()
    const response = await request(app)
      .post('/contact')
      .send(testContact)
      .expect(400)
    expect(response.body.errors[0]).contains('address')
  })
  it('Fails for payload without email', async () => {
    const testContact = testData.contactWithoutEmail()
    const response = await request(app)
      .post('/contact')
      .send(testContact)
      .expect(400)
    expect(response.body.errors[0]).contains('email')
  })
})
