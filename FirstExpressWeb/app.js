var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');  //可以在本地端用
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//新增的功能
var testRouter = require('./routes/test');  //這跟html不一樣
var writeRouter = require('./routes/write');
var deleteRouter = require('./routes/delete');
//新增的功能


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());  //可以在本地端用
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//新增的功能
app.use('/test', testRouter);
app.use('/write', writeRouter);  //寫入資料
app.use('/delete', deleteRouter);
//app.use('/delete', deleteRouter.router);  //刪除資料
//新增的功能

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
