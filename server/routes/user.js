var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var testTemplate = mongoose.model('TestTemplate');
var Test = mongoose.model('Test');
var Question = mongoose.model('Question');

var mdlwares = require('../libs/mdlwares');

router.use(mdlwares.isUser);

router.get('/test', function(req, res, next) {
    res.status(200).send('Hello, user!');
});

router.get('/test_info', function (req, res, next) {
   res.send({testStatus: 'availTest'});
});

router.post('/test_request', function (req, res, next) {
    var test = new Test({
        status: 'requested',
        user: req.user.username
    });
    test.save();
});

router.post('/next_question', function (req, res,next) {
    testTemplate.findOne(function (err, template) {
        sendQuestion(res, template.questions[req.body.n - 1]);
    });
});

function sendQuestion(res, type) {
    Question.find({parent: undefined, type: type}).populate('subQuestions').exec(function (err, questions) {
        var question = questions[randomIndex(questions.length)];
        res.send(question.getQuestion());
    });
}

function randomIndex(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
}

module.exports = router;