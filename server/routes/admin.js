var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var generatePassword = require('password-generator');
var mailer = require('../libs/mailer');
var mdlwares = require('../libs/mdlwares');

router.use(mdlwares.isAdmin);

router.get('/test', function(req, res, next) {
    mailer.sendMail();
    res.status(200).send('Hello, admin!');
});

router.post('/new_teacher', function (req, res, next) {
    var password = generatePassword(12, false);
    User.count({}, function (err, count) {
        var user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: 'Teacher' + count,
            role: 'teacher'
        });
        user.setPassword(password);
        mailer.sendMail(
            user.email,
            'Welcome to ProjectName',
            'Hello, ' + user.firstName + ' ' + user.lastName + '\n' +
            'Your username: ' + user.username + '\n' +
            'Your password: ' + password
        );
        user.save();
        res.end();
    });
});

router.post('/new_guest', function (req, res, next) {
    User.count({}, function (err, count) {
        var user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: 'Guest' + count,
            role: 'guest',
            level: 0
        });
        user.setPassword('11111');
        mailer.sendMail(
            user.email,
            'Welcome to ProjectName',
            'Hello, ' + user.firstName + ' ' + user.lastName + '\n' +
            'Follow the link to start the test: '
        );
        user.save();
        res.end();
    });
});

router.post('/new_test', function (req, res, next) {

    var test = new Test({
        status: 'available',
        user: req.body.username,
        fromTime: req.body.fromTime,
        toTime: req.body.toTime
    });
    test.save();
});

module.exports = router;