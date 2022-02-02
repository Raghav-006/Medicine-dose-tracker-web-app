var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./backend/DBConnect');
var viewPartials = path.join(__dirname, 'templates/partials');
var viewPath = path.join(__dirname, 'templates/views');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRoute = require('./routes/api/loginApi');
var apiRouteReg = require('./routes/api/registerApi');

var app = express();

// view engine setup
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(viewPartials);

app.use(logger('dev'));
app.use(cors());
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
