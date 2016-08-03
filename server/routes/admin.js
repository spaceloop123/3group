var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var generatePassword = require('password-generator');
var mailer = require('../libs/mailer');
var mdlwares = require('../libs/mdlwares');
var questionMap = require('../libs/questionMap');
var questionService = require('../services/questionService');
var userService = require('../services/userService');
var testService = require('../services/testService');
var notificationService = require('../services/notificationService');
var response = require('../libs/responseHelper');

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

router.post('/user_list', function (req, res, next) {
   userService.getUserList(req.body.n, req.body.searchFilter, response.dataResponse(res));
});

function addUser(username, password, role, req) {
    var user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: username,
        role: role,
        level: 0
    });
    user.setPassword(password);
    user.save();
}

router.get('/teachers_list', function (req, res, next) {
    userService.getTeachersList(response.dataResponse(res));
});

router.get('/notifications', function (req, res, next) {
    notificationService.getNotifications(response.dataResponse(res));
});

router.post('/done_notification', function (req, res, next) {
    notificationService.closeDoneNotification(req.body.notificationId, response.emptyResponse(res));
});

router.post('/decline_request_notification', function (req, res, next) {
    notificationService.declineRequestNotification(req.body.notificationId, req.body.testId, response.emptyResponse(res));
});

router.post('/assignTest', function () {
    testService.assignNewTest(req.body.userId, req.body.teacherId,
        req.body.timeFrom, req.body.timeTo, response.emptyResponse(res));
});


module.exports = router;