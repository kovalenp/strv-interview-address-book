'use strict'

const joi = require('joi')
const errors = require('../../errors')

module.exports = {

  validate(data, schema) {
    const result = joi.validate(data, schema, { abortEarly: false })
    if (result.error) {
      throw new errors.ValidationError(result.error.details.map(detail => detail.message))
    }
    return result.value
  },

}
