var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');

require('./server/models/Users');
require('./server/models/questions/Questions');
require('./server/models/questions/TestQuestions');

mongoose.connect("mongodb://localhost/test");

var routes = require('./server/routes/index');
var login = require('./server/routes/login');

require('./server/config/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({secret: 'SECRET'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/', express.static(__dirname));
app.use('/fonts', express.static(__dirname + 'public'));

// passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
