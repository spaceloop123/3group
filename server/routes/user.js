var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var TestTemplate = mongoose.model('TestTemplate');
var Test = mongoose.model('Test');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var testService = require('../services/test');
var questionService = require('../services/question');

var mdlwares = require('../libs/mdlwares');

router.use(mdlwares.isUser);

router.get('/test_info', function (req, res) {
    testService.getTestStatus(req.user.id, function (err, status) {
        err ? res.status(500).end() : res.json({status: status});
    });
});

router.post('/test_request', function (req, res) {
    testService.requestTest(req.user.id, function (err) {
        err ? res.status(500).end() : res.end();
    });
});

router.get('/init_test', function (req, res) {
    testService.initTest(req.user.id, function (err, result) {
        err ? res.status(500).end() :
            result ? res.json(result) : res.status(400).end();
    });
});

router.post('/next_question', function (req, res, next) {
    TestTemplate.findOne(function (err, template) {
        sendQuestion(res, template.questions[req.body.n - 1]);
    });
});

router.post('/next_question_by_id', function (req, res) {
    Question.findOne({_id : req.body.id}, function (err, question) {
        res.json(question.getQuestion());
    });
})

router.post('/next_question_new', function (req, res) {
    questionService.getQuestionByNumber(req.user.id, req.body.testId, req.body.n,
        function (err, question) {
            err ? res.status(500).end() :
                question ? res.json(question) : res.status(400).end();
        });
});

router.post('/next_question_by_id_new', function (req, res) {
    Question.findOne({_id: req.body.id}, function (err, question) {
        res.json(question.getQuestion());
    });
});

function sendQuestion(res, type) {
    Question.find({parent: undefined, type: type}).exec(function (err, questions) {
        var question = questions[randomIndex(questions.length)];
        res.send(question.getQuestion());
    });
}

function randomIndex(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
}

router.post('/answer', function (req, res) {
    Test.findOne({id: req.body.testId, user: req.user.id}, function (err, test) {
        if (err || !test || test.status !== 'available') {
            res.status(400).end();
            return;
        }

        Question.findOne({id: req.body.questionId}, function (err, question) {
            if (err || !question) {
                res.status(400).end();
                return;
            }

            var answer = new Answer({question: question.id, answer: req.body.answer});
            answer.save();

            test.answers.push(answer.id);
            test.save();
            res.end();
        })
    });
});

module.exports = router;