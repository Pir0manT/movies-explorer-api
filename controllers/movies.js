const { Movies } = require('../models/movie')
const { handleError, ForbiddenError } = require('../utils/errors')

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
  Movies.findById({ movieId })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return movie.deleteOne().then(() => res.send(movie))
      }
      throw new ForbiddenError()
    })
    .catch((err) => handleError(err, next))
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
}
