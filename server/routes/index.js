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
    res.render('index');
});

module.exports = router;