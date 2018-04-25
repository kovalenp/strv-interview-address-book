'use strict'

const validator = require('../validator')

module.exports = {

  validateBody(schema) {
    return async (ctx, nextMiddleware) => {
      ctx.request.rawBody = ctx.request.body
      ctx.request.body = validator.validate(ctx.request.body, schema)
      await nextMiddleware()
    }
  },

}
