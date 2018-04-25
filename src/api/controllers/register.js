'use strict'

const compose = require('koa-compose')
const users = require('../../resources/user')
const middleware = require('../middleware')

module.exports = {

  post: compose([
    middleware.validation.validateBody(users.reqValidation.register),
    async ctx => {
      const userData = ctx.request.body
      const registration = await users.register(userData)
      ctx.body = {
        token: registration.accessToken,
        user: registration.user,
      }
      ctx.status = 200
    },
  ]),

}
