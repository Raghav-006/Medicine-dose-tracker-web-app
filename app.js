const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const xss = require('xss-clean')
const { flash } = require('express-flash-message');
const session = require('express-session');
const mongoSanitize = require('express-mongo-sanitize')
const port = process.env.PORT || 8000

require('dotenv').config()
require('./database/db');

const indexRouter = require('./route')
const rRouter = require('./route/r')
//const userRouter = require('./route/user.Routet')
const scheduler = require('./schedule');

const app = express()

app.use(xss())
app.use(mongoSanitize())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    //origin: ['https://ronewa-medicine-tracker.herokuapp.com'],
    credentials: true,
}));

// express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  })
);

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(express.json());
app.locals.moment = require('moment')


app.use('/api',indexRouter);
//app.use('/api/medicine',userRouter)
//app.use('/',rRouter)

if(process.env.NODE_ENV ==='production'){
  app.use(express.static('frontend/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
  });
}

const start = ()=>{
  app.listen(port, () => {
    console.log(`Medicine app listening on port ${port}`)
  })
}

start()

scheduler.start();