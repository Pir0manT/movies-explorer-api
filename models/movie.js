const mongoose = require('mongoose')
const isURL = require('validator/lib/isURL')

const errorMsg = (fieldName) => `Поле ${fieldName} должно быть заполнено`

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, errorMsg('страна')],
    },
    director: {
      type: String,
      required: [true, errorMsg('режиссёр')],
    },
    duration: {
      type: Number,
      required: [true, errorMsg('длительность')],
    },
    year: {
      type: String,
      required: [true, errorMsg('год выпуска')],
    },
    description: {
      type: String,
      required: [true, errorMsg('описание')],
    },
    image: {
      type: String,
      required: [true, errorMsg('постер')],
      validate: {
        validator: (v) => isURL(v),
        message: 'Некорректный URL',
      },
    },
    trailerLink: {
      type: String,
      required: [true, errorMsg('трейлер')],
      validate: {
        validator: isURL,
        message: 'Некорректный URL',
      },
    },
    thumbnail: {
      type: String,
      required: [true, errorMsg('"thumbnail"')],
      validate: {
        validator: isURL,
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, errorMsg('владелец')],
    },
    movieId: {
      type: Number,
      required: [true, errorMsg('"movieId"')],
    },
    nameRU: {
      type: String,
      required: [true, errorMsg('русское название фильма')],
    },
    nameEN: {
      type: String,
      required: [true, errorMsg('английское название фильма')],
    },
  },
  { versionKey: false }
)

const Movies = mongoose.model('movie', movieSchema)

module.exports = { Movies, errorMsg }
