const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../utils/errors')
const { JWT_SECRET } = require('../utils/config')

module.exports = (req, res, next) => {
  if (req.cookies.jwt === undefined) {
    return next(new UnauthorizedError())
  }
  const token = req.cookies.jwt
  let payload

  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return next(new UnauthorizedError())
  }
  req.user = payload
  return next()
}
