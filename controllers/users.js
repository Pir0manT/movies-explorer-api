const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/user')
const { handleError } = require('../utils/errors')
const { JWT_SECRET } = require('../utils/config')
const { USER_MESSAGE } = require('../utils/consts')

const createUser = (req, res, next) => {
  const { name, email, password } = req.body
  return bcrypt
    .hash(password, 10)
    .then((hash) => Users.create({ name, email, password: hash }))
    .then((user) =>
      res.status(201).send({
        name: user.name,
        email: user.email,
      })
    )
    .catch((err) => handleError(err, next))
}

const updateUser = (req, res, next, updateData) =>
  Users.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => handleError(err, next))

const updateProfile = (req, res, next) => {
  const { name, email } = req.body
  return updateUser(req, res, next, { name, email })
}

const findUser = (req, res, next, userId) =>
  Users.findById(userId)
    .orFail()
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => handleError(err, next))

const getCurrentUser = (req, res, next) =>
  findUser(req, res, next, req.user._id)

const login = (req, res, next) => {
  const { email, password } = req.body
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' })
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: `${USER_MESSAGE.ON_LOGIN}, ${user.name}` })
    })
    .catch((err) => handleError(err, next))
}

const logout = (req, res) =>
  res
    .clearCookie('jwt', {
      httpOnly: true,
      sameSite: true,
    })
    .send({ message: USER_MESSAGE.ON_LOGOUT })

module.exports = {
  createUser,
  updateProfile,
  getCurrentUser,
  login,
  logout,
}
