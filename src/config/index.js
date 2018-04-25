'use strict'

const _ = require('lodash')

const env = process.env.NODE_ENV || 'local'

const envConfigPath = `./env/${env}`
const envConfig = require(envConfigPath)
const defaultConfig = require('./default')(env)

const resultConfig = _.merge({}, defaultConfig, envConfig)

module.exports = resultConfig
