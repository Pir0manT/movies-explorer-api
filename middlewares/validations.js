const { celebrate, Joi } = require('celebrate')
const { isURL } = require('validator')
const { errorMsg } = require('../models/movie')
const { BAD_REQUEST, StatusCodeError } = require('../utils/errors')

const validationUrl = (url) => {
  if (isURL(url)) {
    return url
  }
  throw new StatusCodeError(BAD_REQUEST)
}

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Поле email должно быть заполнено'),
    password: Joi.string()
      .required()
      .min(8)
      .message('Поле пароль должно быть заполнено'),
  }),
})

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string()
      .required()
      .email()
      .message('Поле email должно быть заполнено'),
    password: Joi.string()
      .required()
      .min(8)
      .message('Поле пароль должно быть заполнено'),
  }),
})

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .message(
        'Имя пользователя должно быть заполнено и содержать не менее 2 и не более 30 миволов'
      ),
    email: Joi.string()
      .required()
      .email()
      .message('Поле email должно быть заполнено'),
  }),
})

const validationId = (schema = 'movieId') =>
  celebrate({
    params: Joi.object().keys({
      [schema]: Joi.number()
        .required()
        .min(1)
        .message('Передан некорректный id фильма'),
    }),
  })

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).message(errorMsg('страна')),
    director: Joi.string().required().min(1).message(errorMsg('режиссёр')),
    duration: Joi.number().required().min(1).message(errorMsg('длительность')),
    year: Joi.string().required().min(1).message(errorMsg('год выпуска')),
    description: Joi.string().required().min(1).message(errorMsg('описание')),
    image: Joi.string()
      .required()
      .custom(validationUrl)
      .message(errorMsg('постер')),
    trailerLink: Joi.string()
      .required()
      .custom(validationUrl)
      .message(errorMsg('трейлер')),
    thumbnail: Joi.string()
      .required()
      .custom(validationUrl)
      .message(errorMsg('"thumbnail"')),
    movieId: Joi.number().required().min(1).message(errorMsg('"movieId"')),
    nameRU: Joi.string()
      .required()
      .min(1)
      .message(errorMsg('русское название фильма')),
    nameEN: Joi.string()
      .required()
      .min(1)
      .message(errorMsg('английское название фильма')),
  }),
})

module.exports = {
  validationLogin,
  validationCreateUser,
  validationUpdateUser,
  validationId,
  validationCreateMovie,
}
