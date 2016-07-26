var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var Answer = mongoose.model('Answer');
var testService = require('../services/testService');
var answerService = require('../services/answerService');
var mdlwares = require('../libs/mdlwares');

router.use(mdlwares.isTeacher);

router.get('/tests', function (req, res, next) {
    Test.find({teacher: req.user.id, status: 'checked'}, function (err, tests) {
        var response = [];

        if (tests != undefined) {
            tests.forEach(function (test, tests) {
                response.push(test.getTestInfo());
            });
        }
        res.send(JSON.stringify(response));
    });
});

router.post('/check_test', function (req, res, next) {
    testService.getAnswers(req.body.testId, function (err, answers) {
        if(err) {
            res.status(400).end();
        } else {
            res.send({answers: answers});
        }
    });
});

router.post('/check_answer', function (req, res, next) {
    Answer.findOne({_id: req.body.answerId}).populate('question').exec(function (err, answer) {
        res.send(answer.getAnswer());
    });
});

router.get('/get_test', function(req,res){
    Test.findOne({id: req.body.testId}).populate({
        path: 'answers',
        model: 'Answer',
        populate: {
            path: 'question',
            model: 'Question'
        }
    }).exec(function (err, test) {
        var result = [];
        test.answers.forEach(function (answer) {
            result.push({
                questionId : answer.question.id,
                header: answer.question.header,
                answerId: answer.id,
                answer: answer.answer
            });
        });
        res.json(result);
    });
});

module.exports = router;