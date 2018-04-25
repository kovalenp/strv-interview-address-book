'use strict'

const { expect } = require('chai')
const User = require('../../../src/resources/user/model').UserModel
const testData = require('../../utils/test-data')

describe('User data Mongoose scheme validation', () => {
  it('OK for valid user', () => {
    const result = new User(testData.user())
    result.validate(err => expect(err).to.be.null)
  })

  it('fails for user without email', async () => {
    const result = await new User(testData.userWithoutEmail())
    try {
      await result.validate()
    } catch (err) {
      expect(err.name).to.be.equal('ValidationError')
      expect(err.message).contains('email')
    }
  })

  it('fails for user without email', async () => {
    const result = await new User(testData.userWithoutEmail())
    try {
      await result.validate()
    } catch (err) {
      expect(err.name).to.be.equal('ValidationError')
      expect(err.message).contains('email')
    }
  })

  it('fails for user without email', async () => {
    const result = await new User(testData.userWithoutEmail())
    try {
      await result.validate()
    } catch (err) {
      expect(err.name).to.be.equal('ValidationError')
      expect(err.message).contains('email')
    }
  })

  it('fails for user with INVALID email', async () => {
    const result = await new User(testData.userWithInvalidEmail())
    try {
      await result.validate()
    } catch (err) {
      expect(err.name).to.be.equal('ValidationError')
      expect(err.message).contains('Not a valid email')
    }
  })

  it('fails for user without password', async () => {
    const result = new User(testData.userWithoutPassword())
    try {
      await result.validate()
    } catch (err) {
      expect(err.name).to.be.equal('ValidationError')
      expect(err.message).contains('password')
    }
  })

  it('password is not exposed when model serialized to JSON', async () => {
    const underTest = await new User(testData.user())
    expect(underTest.toJSON()).to.not.have.property('password')
  })
})
