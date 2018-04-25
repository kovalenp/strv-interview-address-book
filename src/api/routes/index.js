'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()

// Status
router.get('/', controllers.status.get)
// Register new user
router.post('/register', controllers.register.post)
// Login existing user
router.post('/login', controllers.login.post)
// Create new contact entity in firebase DB
router.post('/contact', controllers.contact.post)

const middleware = router.routes()

module.exports = middleware
