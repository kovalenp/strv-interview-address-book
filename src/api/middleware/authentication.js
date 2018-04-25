'use strict'

const _ = require('lodash')
const auth = require('../../auth')
const error = require('../../errors')

module.exports = {

  verifyToken() {
    return async (ctx, nextMiddleware) => {
      const token = _.get(ctx, 'request.headers.authorization', null)
      if (!token) {
        throw new error.Unauthorized('Missing auth token')
      }
      try {
        const verifiedToken = await auth.verifyAccessToken(token)
        ctx.userId = verifiedToken.user_id
      } catch (err) {
        throw new error.Unauthorized('Auth token is invalid')
      }
      await nextMiddleware()
    }
  },

}
