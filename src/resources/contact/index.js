'use strict'

const admin = require('firebase-admin')
const reqValidation = require('./validation-schema')

module.exports = {

  reqValidation,

  async write(userId, contactData) {
    const path = `users/${userId}/contacts/${contactData.firstName} ${contactData.lastName}`
    const db = admin.database()
    const contactRef = await db.ref(path)
    return contactRef.set(contactData)
  },

}
