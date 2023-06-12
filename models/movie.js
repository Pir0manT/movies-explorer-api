const mongoose = require('mongoose')
const { isURL } = require('validator')

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле страна должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле режиссёр должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле длительность должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле год выпуска должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле описание должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле постер должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Некорректный URL',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле трейлер должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Некорректный URL',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле владелец должно быть заполнено'],
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле русское название фильма должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле английское название фильма должно быть заполнено'],
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('movie', movieSchema)
