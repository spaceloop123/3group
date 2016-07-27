var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Test = mongoose.model('Test');
var TestTemplate = mongoose.model('TestTemplate');
var Answer = mongoose.model('Answer');
var Validator = require('../libs/requestValidator');
var testService = require('../services/testService');

module.exports.getQuestionByNumber = function (userId, testId, n, done) {
    validateQuestionRequest({_id: testId, user: userId, status: 'run'}, n).exec(function (res) {
        var question = res.questions[Math.floor(Math.random() * res.questions.length)];
        var answer = new Answer({question: question.id, autoCheck: question.autoCheck});
        if (question.subQuestions) {
            question.subQuestions.forEach(function (subQuestion) {
                var subAnswer = new Answer({
                    question: subQuestion.id,
                    parent: answer.id,
                    autoCheck: subQuestion.autoCheck
                })
                answer.subAnswers.push(subAnswer.id);
                subAnswer.save();
            });
        }
        res.test.answers.push(answer.id);
        answer.save();
        res.test.save();
        done(null, {question: question.getQuestion()});
    }, done, done);
};

function validateQuestionRequest(testOptions, n) {
    return testService.getTestValidator(testOptions)
        .checkItems({
            rightNumber: function (callback, prev) {
                var maxCount = prev.template.questions.length;
                var curCount = prev.test.answers.length;
                (n <= maxCount && n === curCount + 1) ? callback(null, {}) : callback();
            },
            questions: function (callback, prev) {
                Question.find({parent: undefined, type: prev.template.questions[n - 1]}, callback);
            }
        });
}

module.exports.getQuestionById = function (userId, testId, questionId, done) {
    testService.getTestValidator({
        _id: testId,
        user: userId, status: 'run'
    })
        .checkItems({
            questionId: function (callback, prev) {
                var answers = prev.test.answers;
                answers[answers.length - 1].question === questionId ? callback(null, questionId) : callback();
            },
            question: function (callback, prev) {
                Question.findOne({_id: prev.questionId}).populate().exec(callback);
            }
        })
        .exec(function (res) {
            done(null, {question: res.question.getQuestion()});
        }, done, done);
};