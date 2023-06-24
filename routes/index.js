const router = require('express').Router()
const auth = require('../middlewares/auth')
const usersRouter = require('./users')
const moviesRouter = require('./movies')
const { NotFoundError } = require('../utils/errors')
const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validations')
const { login, createUser, logout } = require('../controllers/users')

router.post('/signin', validationLogin, login)
router.post('/signup', validationCreateUser, createUser)

router.use(auth)

router.post('/signout', logout)
router.use('/users', usersRouter)
router.use('/movies', moviesRouter)

router.use((req, res, next) => {
  next(new NotFoundError())
})

module.exports = router
