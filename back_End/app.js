
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

require('dotenv').config()
require('./database/db');

const indexRouter = require('./route')
const rRouter = require('./route/r')

const app = express()

app.use(xss())
app.use(mongoSanitize())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());
const port = process.env.PORT || 8000

app.use('/api',indexRouter);
app.use('/',rRouter)

const start = ()=>{
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

start()
