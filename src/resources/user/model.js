'use strict'

const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Not a valid email',
      },
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)


// https://stackoverflow.com/questions/11160955/how-to-exclude-some-fields-from-the-document
userSchema.set(
  'toJSON',
  { transform: (doc, ret) => {
    delete ret.password
    return ret
  } },
)

module.exports = {
  UserModel: mongoose.model('User', userSchema),
}
