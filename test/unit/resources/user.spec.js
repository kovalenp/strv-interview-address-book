'use strict'

const { expect, assert } = require('chai')
const mongo = require('../../../src/database/mongo')
const user = require('../../../src/resources/user')
const testData = require('../../utils/test-data')
const firebase = require('../../../src/database/firebase')

describe('User component', () => {
  before(async () => {
    await mongo.init()
    firebase.initAdmin()
  })
  after(() => mongo.close())

  it('Should register a new user', async () => {
    const testUser = testData.user()
    const result = await user.register(testUser)

    assert.isNotNull(result)
    assert.isString(result.accessToken)
    assert.isObject(result.user)

    const userObj = result.user.toJSON()
    expect(userObj).to.include.keys(['_id', 'createdAt', 'updatedAt'])
    expect(userObj).not.to.include.keys(['password'])
  })

  it('Should not register same user twice', async () => {
    const testUser = testData.user()
    await user.register(testUser)

    try {
      await user.register(testUser)
    } catch (err) {
      expect(err.type).equals('Conflict')
    }
  })

  it('Should be login with correct details', async () => {
    const testUser = testData.user()
    await user.register(testUser)

    const result = await user.login(testUser)

    assert.isNotNull(result)
    assert.isString(result.accessToken)
  })

  it('Unathorized err thrown if login with non-existing user', async () => {
    const testUser = testData.user()

    try {
      await user.login(testUser)
    } catch (err) {
      expect(err.type).equals('Unauthorized')
    }
  })

  it('Unathorized err thrown if login with wrong password', async () => {
    const testUser = testData.user()
    await user.register(testUser)
    testUser.password = 'wrongPassword'

    try {
      await user.login(testUser)
    } catch (err) {
      expect(err.type).equals('Unauthorized')
    }
  })
})
