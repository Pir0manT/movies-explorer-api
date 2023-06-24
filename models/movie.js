const mongoose = require('mongoose')
const isURL = require('validator/lib/isURL')
const { VALIDATION_MESSAGES } = require('../utils/consts')

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, VALIDATION_MESSAGES.COUNTRY],
    },
    director: {
      type: String,
      required: [true, VALIDATION_MESSAGES.DIRECTOR],
    },
    duration: {
      type: Number,
      required: [true, VALIDATION_MESSAGES.DURATION],
    },
    year: {
      type: String,
      required: [true, VALIDATION_MESSAGES.YEAR],
    },
    description: {
      type: String,
      required: [true, VALIDATION_MESSAGES.DESCRIPTION],
    },
    image: {
      type: String,
      required: [true, VALIDATION_MESSAGES.POSTER],
      validate: {
        validator: isURL,
        message: VALIDATION_MESSAGES.BAD_URL,
      },
    },
    trailerLink: {
      type: String,
      required: [true, VALIDATION_MESSAGES.TRAILER],
      validate: {
        validator: isURL,
        message: VALIDATION_MESSAGES.BAD_URL,
      },
    },
    thumbnail: {
      type: String,
      required: [true, VALIDATION_MESSAGES.THUMBNAIL],
      validate: {
        validator: isURL,
        message: VALIDATION_MESSAGES.BAD_URL,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, VALIDATION_MESSAGES.OWNER],
    },
    movieId: {
      type: Number,
      required: [true, VALIDATION_MESSAGES.MOVIE_ID],
    },
    nameRU: {
      type: String,
      required: [true, VALIDATION_MESSAGES.NAME_RU],
    },
    nameEN: {
      type: String,
      required: [true, VALIDATION_MESSAGES.NAME_EN],
    },
  },
  { versionKey: false }
)

const Movies = mongoose.model('movie', movieSchema)

module.exports = { Movies }
