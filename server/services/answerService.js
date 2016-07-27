var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var Question = mongoose.model('Question');
var Validator = require('../libs/requestValidator');

module.exports.putAnswer = function (userId, testId, questionId, answer, done) {
    validateAnswerAdding(userId, testId, questionId, answer)
        .exec(function (res) {
            res.answer.answer = answer;
            if (res.question.autoCheck && res.question.correctAnswer === answer) {
                res.test.result += res.question.maxCost;
                res.user.level++;
            } else {
                res.user.level -= res.user.level != 0 ? 1 : 0;
            }
            res.test.maxResult += res.question.maxCost;
            res.user.save();
            res.answer.save();
            done();
        }, done, done);
};

function validateAnswerAdding(userId, testId, questionId) {
    return new Validator()
        .checkItems({
            test: function (callback) {
                Test.findOne({_id: testId, user: userId, status: 'run'}, callback);
            },
            answer: function (callback, prev) {
                var answers = prev.test.answers;
                Answer.findOne({_id: answers[answers.length - 1]}, callback);
            },
            questionId: function (callback, prev) {
                prev.answer.question.toString() === questionId ? callback(null, questionId) : callback();
            },
            question: function (callback, prev) {
                Question.findOne({_id: prev.questionId}, callback);
            },
            user: function (callback) {
                User.findOne({_id: userId}, callback);
            }
        });
}

module.exports.getAnswerById = function (answerId, done) {
    var validator = new Validator();

    validator.checkItem('answer', function (callback) {
        Answer.findOne({_id: answerId}).populate('question').exec(callback);
    });

    validator.exec(function (res) {
        done(null, res.answer.getAnswer());
    }, done, done);
};