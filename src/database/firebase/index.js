'use strict'

const firebase = require('firebase')
const admin = require('firebase-admin')
const adminConfig = require('./admin.json')
const clientCongig = require('./client.json')

function initClient() {
  // Initialize client to get tokenId
  if (firebase.apps.length === 0) {
    firebase.initializeApp(clientCongig)
  }
  return firebase
}

function initAdmin() {
  // Initialize the app with a service account, granting admin privileges
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databaseURL: clientCongig.databaseURL,
    })
  }
  return admin
}

module.exports = {

  initClient,
  initAdmin,

}
