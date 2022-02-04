const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
//const xss = require('xss');
const mongoSanitize = require('express-mongo-sanitize')
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./backend/DBConnect');
const viewPartials = path.join(__dirname, 'templates/partials');
const viewPath = path.join(__dirname, 'templates/views');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRoute = require('./routes/api/loginApi');
const apiRouteReg = require('./routes/api/registerApi');

const app = express();

// view engine setup
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(viewPartials);

app.use(logger('dev'));
app.use(cors());
//app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRoute);
app.use('/apireg',apiRouteReg);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
