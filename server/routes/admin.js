var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var generatePassword = require('password-generator');
var mdlwares = require('../libs/mdlwares');

router.use(mdlwares.isAdmin);

router.get('/test', function(req, res, next) {
    res.status(200).send('Hello, admin!');
});

router.post('/new_teacher', function (req, res, next) {
    User.count({}, function (err, count) {
        var password = generatePassword(12, false);
        var user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: 'teacher'
        });
        user.username = 'Teacher' + count;
        user.setPassword(password);
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
            role: 'guest',
            level: 0
        });
        user.username = 'Guest' + count;
        user.setPassword('11111');
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