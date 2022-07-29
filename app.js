const path = require('path')
const express = require('express')
const http = require('http')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const xss = require('xss-clean')
const { flash } = require('express-flash-message')
const { Server } = require("socket.io")
require('better-logging')(console)
//const session = require('express-session');
const mongoSanitize = require('express-mongo-sanitize')
const port = process.env.PORT || 8000

require('dotenv').config();
require('./database/db');

const indexRouter = require('./route')
const rRouter = require('./route/r')
//const userRouter = require('./route/user.Routet')
const scheduler = require('./schedule');

const app = express()
const server = http.createServer(app)
const io = new Server(server) 
app.use(xss())
app.use(mongoSanitize())
app.use(cookieParser())
app.use(cors({
	  origin: process.env.ORIGIN_LOCAL,
    credentials: true,
}));

// express-session
/*app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true,
    },
  })
);*/

// apply express-flash-message middleware
//app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(express.json());
app.locals.moment = require('moment')


app.use('/api',indexRouter);
//app.use('/api/medicine',userRouter)
//app.use('/',rRouter)

/*io.on('connection', (socket) => {
  console.info('a user connected');
  socket.on('disconnect', () => {
    console.warn('user disconnected');
  });
});*/

if(process.env.NODE_ENV ==='production'){
  app.use(express.static('frontend/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
  });
}

const start = ()=>{
  app.listen(port, () => {
    console.info(`Medicine app listening on port ${port}`)
  })
}

start()

scheduler.start();