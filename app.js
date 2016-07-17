var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');

require('./server/models/Users');
require('./server/models/questions/Questions');
require('./server/models/questions/TestQuestions');
require('./server/models/questions/AudioQuestions');
require('./server/models/questions/ReadingQuestions');
require('./server/models/questions/SpeechQuestion');

mongoose.connect("mongodb://localhost/test");

var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var auth = require('./server/routes/auth');
var admin = require('./server/routes/admin');
var teacher = require('./server/routes/teacher');
var user = require('./server/routes/user');
var guest = require('./server/routes/guest');
var mdlwares = require('./server/libs/mdlwares');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'ejs');

app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/', express.static(__dirname));
app.use('/fonts', express.static(__dirname + 'public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

require('./server/config/passport');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    store: new MongoStore({
        url: "mongodb://localhost/passport"
    }),
    secret: 'SECRET', resave: false, saveUninitialized: false,
    cookie: {secure: false, maxAge: 20 * 60 * 1000}
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', routes);
app.use('/users', users);

app.post('/login', auth.login);
//app.get('/logout', auth.logout);

app.use(mdlwares.isAuthenticated);

app.use('/admin', admin);
app.use('/teacher', teacher);
app.use('/user', user);
app.use('/guest', guest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
