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
        var guest = addUser(username, password, 'guest', req);

        var test = new Test({
            status: 'available',
            user: guest.id,
            teacher: req.body.teacher,
            answerd: [],
            fromTime: new Date(req.body.timeFrom),
            toTime: new Date(req.body.timeTo)
        });
        test.save();
        mailer.sendMail(
            req.body.email,
            'Welcome to ProjectName',
            'Hello, ' + req.body.firstName + ' ' + req.body.lastName + '\n' +
            'Follow the link to start the test: http://192.168.14.81:1507/guest/allowTest?id=' + guest.id
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

router.post('/add_questions', function (req, res) {
    questionService.addQuestions(req.body);
    res.status(200).end();

});

router.post('/user_list', function (req, res) {
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
    return user;
}

router.get('/teachers_list', function (req, res) {
    userService.getTeachersList(response.dataResponse(res));
});

router.get('/notifications', function (req, res) {
    notificationService.getNotifications(response.dataResponse(res));
});

router.post('/done_notification', function (req, res) {
    notificationService.closeDoneNotification(req.body.notificationId, response.emptyResponse(res));
});

router.post('/decline_request_notification', function (req, res) {
    notificationService.declineRequestNotification(req.body.notificationId, req.body.testId, response.emptyResponse(res));
});

router.post('/accept_request_notification', function (req, res) {
    notificationService.acceptRequestNotification(req.body.notificationId, req.body.userId,
        req.body.teacherId, req.body.timeFrom, req.body.timeTo, response.emptyResponse(res));
});

router.post('/assign_test', function (req, res) {
    testService.assignNewTest(req.body.userId, req.body.teacherId,
        req.body.timeFrom, req.body.timeTo, response.emptyResponse(res));
});


router.post('/user_history', function (req, res) {
    userService.getUserHistory(req.body.userId, response.dataResponse(res));
});

router.post('/test_history', function (req, res) {
    testService.getTestsHistory(req.body.userId, req.body.testIds, response.dataResponse(res));
});

router.post('/user_info', function (req, res) {
    userService.getUserInfo(req.body.userId, response.dataResponse(res));
});

module.exports = router;