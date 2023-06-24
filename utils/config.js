const { config } = require('dotenv')

if (process.env.NODE_ENV === 'production') {
  config()
}

const {
  PORT = 3000,
  DB_PATH = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  BASE_URL = 'http://localhost',
  JWT_SECRET = process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : '85353ab2edfacd45adcb8a9b27c3187df2663355dba48fdb23d0c2184246881a',
  LOGGER_BASE_URL = 'http://localhost:3100',
  MAX_AUTH_ATTEMPTS = process.env.NODE_ENV === 'production'
    ? process.env.MAX_AUTH_ATTEMPTS
    : 500,
  NODE_ENV,
} = process.env

module.exports = {
  PORT,
  DB_PATH,
  BASE_URL,
  JWT_SECRET,
  LOGGER_BASE_URL,
  MAX_AUTH_ATTEMPTS,
  NODE_ENV,
}
