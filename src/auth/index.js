'use strict'

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const admin = require('firebase-admin')
const firebase = require('firebase')
const config = require('../config')

const BEARER_PREFIX = 'Bearer '

module.exports = {

  hashPassword(password) {
    return bcrypt.hash(pepperify(password), config.auth.saltRounds)
  },

  comparePasswords(plainText, cipherText) {
    return bcrypt.compare(pepperify(plainText), cipherText)
  },

  generateAccessToken(userId) {
    return admin.auth().createCustomToken(userId)
  },

  async verifyAccessToken(authToken) {
    const token = authToken.replace(BEARER_PREFIX, '')
    const idToken = await signInWithCustomToken(token)
    return verifyIdToken(idToken)
  },

}

function pepperify(string) {
  return crypto
    .createHmac('sha1', config.auth.secret)
    .update(string)
    .digest('hex')
}

function signInWithCustomToken(customToken) {
  return firebase.auth()
    .signInWithCustomToken(customToken)
    .then(firebaseUser => firebaseUser.getIdToken())
}

function verifyIdToken(idToken) {
  return admin.auth().verifyIdToken(idToken)
}
