'use strict'

const compose = require('koa-compose')
const contact = require('../../resources/contact')
const middleware = require('../middleware')

module.exports = {

  post: compose([
    middleware.validation.validateBody(contact.reqValidation.contact),
    middleware.authentication.verifyToken(),
    async ctx => {
      const contactData = ctx.request.body
      await contact.write(ctx.userId, contactData)
      ctx.status = 201
    },
  ]),

}
