'use strict'

const Chance = require('chance')

const chance = new Chance()

module.exports = {

  user: () => ({
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: chance.word({ length: 10 }),
  }),
  userWithoutEmail: () => ({
    firstName: chance.first(),
    lastName: chance.last(),
    password: chance.word({ length: 10 }),
  }),
  userWithInvalidEmail: () => ({
    email: 'writeMeMaybe?',
    firstName: chance.first(),
    lastName: chance.last(),
    password: chance.word({ length: 10 }),
  }),
  userWithoutPassword: () => ({
    email: chance.email(),
    firstName: chance.first(),
    lastName: chance.last(),
  }),
  contact: () => ({
    email: chance.email(),
    firstName: chance.first(),
    lastName: chance.last(),
    address: chance.address(),
    phone: chance.phone(),
  }),
  contactWithoutAddress: () => ({
    email: chance.email(),
    firstName: chance.first(),
    lastName: chance.last(),
    phone: chance.phone(),
  }),
  contactWithoutEmail: () => ({
    firstName: chance.first(),
    lastName: chance.last(),
    address: chance.address(),
    phone: chance.phone(),
  }),
}
