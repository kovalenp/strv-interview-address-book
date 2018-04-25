'use strict'

const pkg = require('../../../package.json')

module.exports = {

  get(ctx) {
    ctx.status = 200
    ctx.body = {
      status: `${pkg.name} is running`,
      version: pkg.version,
    }
  },

}

