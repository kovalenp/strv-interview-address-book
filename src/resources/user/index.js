'use strict'

const log = require('../../logger')
const errors = require('../../errors')
const auth = require('../../auth')
const reqValidation = require('./validation-schema')
const User = require('./model').UserModel

module.exports = {

  reqValidation,

  async register(userData) {
    log.info({ email: userData.email }, 'Registering user.')

    // Verify that the user does not exist
    const conflictUser = await getByEmail(userData.email)
    log.info(`Debug ${JSON.stringify(conflictUser)}`)
    if (conflictUser) {
      throw new errors.ConflictError('User.Conflict')
    }

    // Hash password
    const model = Object.assign({}, userData)
    model.password = await auth.hashPassword(userData.password)

    // Create a database record
    const user = await new User(model).save()
    const accessToken = await auth.generateAccessToken(user.id)

    return {
      user,
      accessToken,
    }
  },

  async login(userData) {
    log.info({ email: userData.email }, 'User sign in.')

    // Find user
    const user = await getByEmail(userData.email)
    log.info(JSON.stringify(user))
    if (!user) {
      throw new errors.Unauthorized()
    }

    // Verify password
    const isPasswordValid = await auth.comparePasswords(userData.password, user.password)
    if (!isPasswordValid) {
      throw new errors.Unauthorized()
    }

    // Generate auth data
    const accessToken = await auth.generateAccessToken(user.id)
    return {
      user,
      accessToken,
    }
  },
}

function getByEmail(email) {
  return User.findOne({ email })
}
