const jwt = require('jsonwebtoken')
const { UNAUTHORIZED, StatusCodeError } = require('../utils/errors')

module.exports = (req, res, next) => {
  if (req.cookies.jwt === undefined) {
    return next(new StatusCodeError(UNAUTHORIZED))
  }
  const token = req.cookies.jwt
  const { NODE_ENV, JWT_SECRET } = process.env
  let payload

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : '85353ab2edfacd45adcb8a9b27c3187df2663355dba48fdb23d0c2184246881a'
    )
  } catch (err) {
    return next(new StatusCodeError(UNAUTHORIZED))
  }
  req.user = payload
  return next()
}
