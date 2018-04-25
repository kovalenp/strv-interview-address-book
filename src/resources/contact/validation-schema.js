'use strict'

const joi = require('joi')

module.exports = {

  contact: joi.object().keys({
    email: joi.string().email().required(),
    phone: joi.string().min(9),
    firstName: joi.string().max(40).required(),
    lastName: joi.string().max(50).required(),
    address: joi.string().required(),
  }),

}
