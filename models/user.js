const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')
const { UnauthorizedError } = require('../utils/errors')
const { DEFAULT_ERROR_MESSAGES } = require('../utils/consts')
const { VALIDATION_MESSAGES } = require('../utils/consts')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, VALIDATION_MESSAGES.USER],
      minlength: [2, VALIDATION_MESSAGES.USER],
      maxlength: [30, VALIDATION_MESSAGES.USER],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: isEmail,
        message: VALIDATION_MESSAGES.EMAIL.BAD,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false }
)

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(DEFAULT_ERROR_MESSAGES.BAD_CREDENTIALS)
        )
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(DEFAULT_ERROR_MESSAGES.BAD_CREDENTIALS)
          )
        }
        return user
      })
    })
}

module.exports = mongoose.model('user', userSchema)
