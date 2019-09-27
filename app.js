var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require('express-sanitizer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies'); // api example
const catsRouter = require('./routes/cats'); // db example
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// express.json & express/encoded are only for POST & PUT as you send data object to server
app.use(express.json()); // for application/json   -> recognizes incoming to server Request Object as JSON Object
app.use(cookieParser());

// extended true allows for rich objects to be sent & arrays to be encoded into urls
// so if false 1) you can't post "nested object" eg person[name] blog[content]; 
// but will not filter '?' from query string  ?name=bob  will be { '?name': 'bob'}
// express.urlencoded recognizes incoming Request Object as string or array
app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // in url: _method=PUT/DELETE
app.use(expressSanitizer());

// body-parser ALTERNATIVE to express.json/urlencoded
// app.use(bodyParser.urlencoded({ extended: 'true' })); // const requestBodyStr = JSON.stringify(req.body);



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/cats', catsRouter);

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
