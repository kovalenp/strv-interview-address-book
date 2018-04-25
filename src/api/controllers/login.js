'use strict'

const compose = require('koa-compose')
const users = require('../../resources/user')
const middleware = require('../middleware')

module.exports = {

  post: compose([
    middleware.validation.validateBody(users.reqValidation.login),
    async ctx => {
      const userData = ctx.request.body
      const session = await users.login(userData)
      ctx.body = { token: session.accessToken }
      ctx.status = 200
    },
  ]),

}
