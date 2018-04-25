'use strict'

/* eslint-disable no-process-env */

const pkg = require('../../package.json')

module.exports = env => ({
  env,
  appName: pkg.name,
  server: {
    port: process.env.PORT || 3000,
    bodyParser: {
      multipart: true,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'ETag',
      ],
      maxAge: 3600,
    },
  },
  db: {
    host: process.env.MONGODB_URI || 'mongodb://localhost:27017/AddressBook',
  },
  auth: {
    secret: process.env.AUTH_SECRET
      || '?!5tP+Q_9t7mC?54KcFD$Xuh_G-Q4yp!!Uthh6Zy&qPWCyhgZ=an8gtSNUKR$rvr',
    saltRounds: 10,
  },
  logging: {
    stdout: {
      enabled: true,
      level: 'debug',
    },
  },
})
