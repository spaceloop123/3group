var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var Answer = mongoose.model('Answer');
var testService = require('../services/testService');
var answerService = require('../services/answerService');
var mdlwares = require('../libs/mdlwares');
var response = require('../libs/responseHelper');

router.use(mdlwares.isTeacher);

router.get('/tests', function (req, res, next) {
    testService.getTeachersTests(req.user.id, response.dataResponse(req, res));
});

router.post('/check_test', function (req, res, next) {
    testService.getAnswers(req.body.testId, response.dataResponse(req, res));
});

router.post('/check_answer', function (req, res, next) {
    answerService.getAnswerById(req.body.answerId, response.dataResponse(req, res));
});

router.post('/send_mark', function (req, res, next) {
    answerService.setMark(req.body.answerId, req.body.testId, req.body.mark, response.emptyResponse(req, res));
});

router.post('/end_test', function (req, res, next) {
    testService.changeTestStatus('complete', req.body.testId, response.emptyResponse(req, res));
});

module.exports = router;