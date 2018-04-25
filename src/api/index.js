'use strict'

const Koa = require('koa')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')
const config = require('../config')
const mongo = require('../database/mongo')
const firebase = require('../database/firebase')
const log = require('../logger')
const routes = require('./routes')
const middleware = require('./middleware')

const app = new Koa()

// Register middleware
app.use(koaCompress())
app.use(koaCors(config.server.cors))
app.use(koaBody(config.server.bodyParser))
app.use(middleware.errorHandling.handleError)

app.use(middleware.docs)

// Register routes
app.use(routes)

// Define start method
app.start = async () => {
  log.info('Starting server ...')
  try {
    await mongo.init()
    await firebase.initClient()
    await firebase.initAdmin()
  } catch (err) {
    log.error(err, 'Failed to start server')
  }
  app.listen(config.server.port)
  log.info(`🌍 Server is running on port ${config.server.port}.`)
}

// Start app
if (require.main === module) {
  app.start()
}

module.exports = app
