var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var generatePassword = require('password-generator');
var mailer = require('../libs/mailer');
var mdlwares = require('../libs/mdlwares');
var questionMap = require('../libs/questionMap');
var questionService = require('../services/questionService')

router.use(mdlwares.isAdmin);

router.get('/test', function(req, res, next) {
    mailer.sendMail();
    res.status(200).send('Hello, admin!');
});

router.post('/new_teacher', function (req, res, next) {
    User.count({}, function (err, count) {
        var username = 'Teacher' + count;
        var password = generatePassword(12, false);
        addUser(username, password, 'teacher', req);
        mailer.sendMail(
            req.body.email,
            'Welcome to ProjectName',
            'Hello, ' + req.body.firstName + ' ' + req.body.lastName + '\n' +
            'Your username: ' + username + '\n' +
            'Your password: ' + password
        );
        res.end();
    });
});

router.post('/new_guest', function (req, res, next) {
    User.count({}, function (err, count) {
        var username = 'Guest' + count;
        var password = '11111';
        addUser(username, password, 'guest', req);
        mailer.sendMail(
            req.body.email,
            'Welcome to ProjectName',
            'Hello, ' + req.body.firstName + ' ' + req.body.lastName + '\n' +
            'Follow the link to start the test: '
        );
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

router.post('/add_questions', function (req, res, next) {
    questionService.addQuestions(req.body);
    res.status(200).end();
});

router.get('/user_list', function (req, res, next) {
   User.find({}, function (err, users) {
     res.json(users.map(function (item) {
         return item.getInfo();
     }));
   });
});

function addUser(username, password, role, req) {
    var user = new User({
        email: req.body.email,
        firstName: req.body.firsName,
        lastName: req.body.lastName,
        username: username,
        role: role,
        level: 0
    });
    user.setPassword(password);
    user.save();
}

module.exports = router;