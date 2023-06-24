const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const { errors } = require('celebrate')
const cors = require('cors')
const responseTime = require('response-time')
const rateLimit = require('express-rate-limit')
const routes = require('./routes')
const errorsHandler = require('./middlewares/handelError')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const { PORT, DB_PATH, BASE_URL, MAX_AUTH_ATTEMPTS } = require('./utils/config')
const { USER_MESSAGE, DEFAULT_ERROR_MESSAGES } = require('./utils/consts')

const app = express()

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: MAX_AUTH_ATTEMPTS,
  message: DEFAULT_ERROR_MESSAGES.MAX_LIMIT_REACHED,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
})

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: BASE_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
)
app.use(authLimiter)

app.use(responseTime(requestLogger))

app.use(routes)
app.use(errorLogger)
app.use(errors())
app.use(errorsHandler)

mongoose.connect(DB_PATH)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(USER_MESSAGE.DB_CONNECT)
})

app.listen(PORT, () => {
  console.log(`${USER_MESSAGE.APP_RUN} ${PORT}`)
})
