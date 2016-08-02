var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var TestQuestion = mongoose.model('TestQuestion');
var InsertTestQuestion = mongoose.model('InsertTestQuestion');
var ReadingQuestion = mongoose.model('ReadingQuestion');
var AudioQuestion = mongoose.model('AudioQuestion');
var OpenQuestion = mongoose.model('OpenQuestion');
var SpeechQuestion = mongoose.model('SpeechQuestion');
var Test = mongoose.model('Test');
var Answer = mongoose.model('Answer');
var Notification = mongoose.model('Notification');
var path = require('path');

router.get('/', function (req, res) {
    // var notification = new Notification({
    //     type: 'done',
    //     user: '5782a87a8ef025441931cb5b',
    //     teacher: '5782a8ae8ef025441931cb5d',
    //     test: '579752c31055441dd083427b'
    // });
    // notification.save(function (err) {
    //     console.log(err);
    // });
    res.render('index');
});

// TODO: (pay attention) May not necessary now
router.get('/is_authenticated', function (req, res) {
    res.json(req.isAuthenticated());
});

router.get('/app_routes', function (req, res) {
    res.sendFile(__dirname + '\\index.js');
});

router.get('/role', function (req, res) {
    res.json(req.user ? req.user.role : null);
});

module.exports = router;