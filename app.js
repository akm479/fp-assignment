var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var CronJob = require('cron').CronJob;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var storeData = require('./services/storeData')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SETTING UP THE ROUTER
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.set('port', process.env.PORT || 3000);

console.log(`Running on ${app.get('port')}`);

var server = app.listen(app.get('port'), function() {
  console.log("express running on port",server.address().port);
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

// CRON JOB THAT RUNS EVERY MINUTE TO UPDATE THE RECORDS IN THE TABLE

var job = new CronJob('10 * * * * *',storeData.getVideoData, null, true, 'America/Los_Angeles');
job.start();

module.exports = app;
