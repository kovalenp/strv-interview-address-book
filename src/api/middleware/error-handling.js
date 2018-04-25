'use strict'

const uuid = require('uuid')
const errors = require('../../errors')
const log = require('../../logger')
const config = require('../../config')

module.exports = {

  async handleError(ctx, nextMiddleware) {
    try {
      await nextMiddleware()
    } catch (err) {
      if (err instanceof errors.AppError) {
        processKnownError(ctx, err)
      } else {
        processUnknownError(ctx, err)
      }
    }
  },

}

function processKnownError(ctx, err) {
  log.error(err)
  ctx.status = err.status || 500
  ctx.body = {
    type: err.type,
    message: err.message,
    errors: err.errors,
  }
}

function processUnknownError(ctx, err) {
  err.correlationId = uuid.v1()
  log.error(err, 'Unhandled error')
  ctx.status = 500
  ctx.body = {
    correlationId: err.correlationId,
    message: err.message,
  }
  if (config.env !== 'production') {
    ctx.body.stackTrace = err.stack
  }
}
