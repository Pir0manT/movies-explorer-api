const Movies = require('../models/movie')
const { handleError, FORBIDDEN, StatusCodeError } = require('../utils/errors')

const getMovies = (req, res, next) =>
  Movies.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movie) => res.send(movie))
    .catch((err) => handleError(err, next))

const createMovie = (req, res, next) =>
  Movies.create({ owner: req.user._id, ...req.body })
    .then((newMovie) => {
      Movies.findById(newMovie._id)
        .populate(['owner'])
        .then((movie) => res.status(201).send(movie))
    })
    .catch((err) => handleError(err, next))

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params
  return Movies.findOneAndDelete({ owner: req.user._id, movieId })
    .orFail()
    .populate(['owner'])
    .then((movie) => res.send(movie))
    .catch((err) => handleError(err, next))
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
}
