'use strict'

const mongoose = require('mongoose')
const config = require('../../config')

module.exports = {

  init() {
    return mongoose.connect(config.db.host)
  },
  close() {
    return mongoose.disconnect()
  },
  mongoose,

}
