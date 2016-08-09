var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var Question = mongoose.model('Question');
var Validator = require('../libs/requestValidator');

module.exports.addAnswer = function (userId, testId, questionId, answer, done) {
    putAnswer('answer', userId, testId, questionId, answer, done);
};

module.exports.addSubanswer = function (userId, testId, questionId, answer, done) {
    putAnswer('subanswer', userId, testId, questionId, answer, done);
};

function putAnswer(type, userId, testId, questionId, answer, done) {
    validateAnswer(type, userId, testId, questionId)
        .exec(function (res) {
            if (res.question.type === 'AudioQuestion') {
                res.question.deleteTempFile();
            }
            res.answer.answer = answer;
            if (res.question.autoCheck && res.question.correctAnswer === answer) {
                res.test.result += res.question.maxCost;
                res.user.level += res.user.level < 100;
                res.answer.mark = res.question.maxCost;
            } else {
                res.user.level -= res.user.level > 0;
            }
            res.test.maxResult += res.question.maxCost || 0;
            res.user.save();
            res.answer.save();
            done();
        }, done, done);
}

function validateAnswer(type, userId, testId, questionId) {
    return new Validator()
        .checkItems({
            test: function (callback) {
                Test.findOne({_id: testId, user: userId, status: 'run'}, callback);
            },
            answer: function (callback, prev) {
                answerId = prev.test.answers[prev.test.answers.length - 1].id;
                type === 'answer' ?
                    Answer.findOne({_id: answerId, question: questionId}, callback) :
                    Answer.findOne({parent: answerId, question: questionId}, callback);
            },
            question: function (callback, prev) {
                Question.findOne({_id: questionId}, callback);
            },
            user: function (callback) {
                User.findOne({_id: userId}, callback);
            }
        });
}

module.exports.getAnswerById = function (answerId, done) {
    new Validator()
        .checkItem('answer', function (callback) {
            Answer.findOne({_id: answerId}).populate('question').exec(callback);
        })
        .exec(function (res) {
            done(null, res.answer.getAnswer());
        }, done, done);
};

module.exports.setMark = function (answerId, testId, proportion, done) {
    new Validator()
        .checkItems({
            answer: function (callback, prev) {
                Answer.findOne({_id: answerId}).populate('question').exec(callback);
            },
            test: function (callback, prev) {
                Test.findOne({_id: testId}).exec(callback);
            }
        })
        .exec(function (res) {
            var mark = Math.floor(res.answer.question.maxCost * proportion / 100);
            res.answer.mark = mark;
            res.test.result += mark;
            res.test.maxResult += res.answer.question.maxCost;
            res.answer.save();
            res.test.save();
            done();
        }, done, done);
};