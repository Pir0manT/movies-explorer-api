const { DEFAULT_ERROR_MESSAGES } = require('../utils/consts')

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err
  res.status(statusCode).send({
    message: statusCode === 500 ? DEFAULT_ERROR_MESSAGES.SERVER_ERROR : message,
  })
  next()
}
