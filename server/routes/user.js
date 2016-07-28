var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var TestTemplate = mongoose.model('TestTemplate');
var Test = mongoose.model('Test');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var User = mongoose.model('User');
var testService = require('../services/testService');
var questionService = require('../services/questionService');
var answerService = require('../services/answerService');
var response = require('../libs/responseHelper');

var mdlwares = require('../libs/mdlwares');

router.use(mdlwares.isUser);

router.get('/test_info', function (req, res) {
    testService.getTestStatus(req.user.id, response.dataResponse(res));
});

router.get('/init_test', function (req, res) {
    testService.initTest(req.user.id, response.dataResponse(res));
});

router.post('/next_question', function (req, res) {
    questionService.getQuestion(req.user.id, req.body.testId, req.body.n, response.dataResponse(res));
});

router.post('/next_subquestion', function (req, res) {
    questionService.getSubquestion(req.user.id, req.body.testId, req.body.id, response.dataResponse(res));
});

router.post('/answer', function (req, res) {
    answerService.putAnswer(req.user.id, req.body.testId, req.body.questionId, req.body.answer, response.emptyResponse(res));
});

router.post('/subanswer', function (req, res) {
    answerService.putSubanswer(req.user.id, req.body.testId, req.body.questionId, req.body.answer, response.emptyResponse(res));
});

router.post('/ask_test', function (req, res) {
    testService.requestTest(req.user.id, function (err) {
        err ? res.status(400).end() : res.status(200).end();
    });
});

router.post('/end_test', function (req, res) {
    testService.endTest(req.body.testId, function (err) {
        err ? res.status(400).end() : res.status(200).end();
    });
});

module.exports = router;