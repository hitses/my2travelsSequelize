var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
var winston = require('./config/winston');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var travelsRouter = require('./routes/travels');
var mailRouter = require('./routes/mail');

var app = express();

app.use(session({
  secret: 'miClaveSecreta',
  name: 'sesionUsuario',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* app.use(logger('dev')); */
app.use(logger('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cambiar muestra en pantalla
/* app.use(function(req, res, next) {
  res.locals.info = "hola caracola rubeola";
  next()
}) */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travels', travelsRouter);
app.use('/mail', mailRouter);

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
