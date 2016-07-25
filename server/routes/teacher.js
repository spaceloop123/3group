var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');
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
    Test.findOne({_id: req.body.id})
        .populate({path: 'answers', model: 'Answer'})
        .exec(function (err, test) {
            var response;
            if (test != null)
                response = test.getNotAutomaticallyCheckAnswers();
            res.send({answers: response});
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