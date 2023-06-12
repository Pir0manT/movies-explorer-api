const router = require('express').Router()
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies')
const {
  validationId,
  validationCreateMovie,
} = require('../middlewares/validations')

router.get('/', getMovies)
router.post('/', validationCreateMovie, createMovie)
router.delete('/:movieId', validationId(), deleteMovie)

module.exports = router
