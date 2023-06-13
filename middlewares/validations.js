const { celebrate, Joi } = require('celebrate')
const { Types } = require('mongoose')
const { isURL } = require('validator')
const { BadRequestError } = require('../utils/errors')
const { VALIDATION_MESSAGES } = require('../utils/consts')

const validationUrl = (url) => {
  if (isURL(url)) {
    return url
  }
  throw new BadRequestError()
}

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message(VALIDATION_MESSAGES.EMAIL.EMPTY),
    password: Joi.string().required(),
  }),
})

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .message(VALIDATION_MESSAGES.USER),
    email: Joi.string()
      .required()
      .email()
      .message(VALIDATION_MESSAGES.EMAIL.EMPTY),
    password: Joi.string().required(),
  }),
})

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .message(VALIDATION_MESSAGES.USER),
    email: Joi.string()
      .required()
      .email()
      .message(VALIDATION_MESSAGES.EMAIL.EMPTY),
  }),
})

const validationId = (schema = 'movieId') =>
  celebrate({
    params: Joi.object().keys({
      [schema]: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!Types.ObjectId.isValid(value)) {
            return helpers.message(VALIDATION_MESSAGES.MOVIE_ID.BAD)
          }
          return value
        }),
    }),
  })

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string()
      .required()
      .min(1)
      .message(VALIDATION_MESSAGES.COUNTRY),
    director: Joi.string()
      .required()
      .min(1)
      .message(VALIDATION_MESSAGES.DIRECTOR),
    duration: Joi.number()
      .required()
      .min(1)
      .message(VALIDATION_MESSAGES.DURATION),
    year: Joi.string().required().min(1).message(VALIDATION_MESSAGES.YEAR),
    description: Joi.string()
      .required()
      .min(1)
      .message(VALIDATION_MESSAGES.DESCRIPTION),
    image: Joi.string()
      .required()
      .custom(validationUrl)
      .message(VALIDATION_MESSAGES.POSTER),
    trailerLink: Joi.string()
      .required()
      .custom(validationUrl)
      .message(VALIDATION_MESSAGES.TRAILER),
    thumbnail: Joi.string()
      .required()
      .custom(validationUrl)
      .message(VALIDATION_MESSAGES.THUMBNAIL),
    movieId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.message(VALIDATION_MESSAGES.MOVIE_ID.BAD)
        }
        return value
      }),
    nameRU: Joi.string().required().min(1).message(VALIDATION_MESSAGES.NAME_RU),
    nameEN: Joi.string().required().min(1).message(VALIDATION_MESSAGES.NAME_EN),
  }),
})

module.exports = {
  validationLogin,
  validationCreateUser,
  validationUpdateUser,
  validationId,
  validationCreateMovie,
}
