'use strict'

const joi = require('joi')

module.exports = {

  register: joi.object().keys({
    email: joi.string().email().required(),
    firstName: joi.string().max(40),
    lastName: joi.string().max(50),
    password: joi.string().min(8).required(),
  }),

  login: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),

}
