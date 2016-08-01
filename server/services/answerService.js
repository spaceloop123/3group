var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var Question = mongoose.model('Question');
var Validator = require('../libs/requestValidator');

module.exports.putAnswer = function (userId, testId, questionId, answer, done) {
    validateAnswerAdding(userId, testId, questionId)
        .exec(function (res) {
            res.answer.answer = answer;
            if (res.question.autoCheck && res.question.correctAnswer === answer) {
                res.test.result += res.question.maxCost;
                res.user.level++;
            } else {
                res.user.level--;
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

module.exports.putSubanswer = function (userId, testId, questionId, answer, done) {
    validateSubanswerAdding(userId, testId, questionId)
        .exec(function (res) {
            res.subanswer.answer = answer;
            if (res.question.autoCheck && res.question.correctAnswer === answer) {
                res.test.result += res.question.maxCost;
                res.user.level++;
            } else {
                res.user.level--;
            }
            res.test.maxResult += res.question.maxCost;
            res.user.save();
            res.subanswer.save();
            res.test.save();
            done();
        }, done, done);
};

function validateSubanswerAdding(userId, testId, questionId) {
    return new Validator()
        .checkItems({
            test: function (callback) {
                Test.findOne({_id: testId, user: userId, status: 'run'}, callback);
            },
            answer: function (callback, prev) {
                var answers = prev.test.answers;
                Answer.findOne({_id: answers[answers.length - 1]}).populate('subAnswers').exec(callback);
            },
            subanswers: function (callback, prev) {
                prev.answer.subAnswers ? callback(null, prev.answer.subAnswers) : callback();
            },
            subanswer: function (callback, prev) {
                var rightSubanswer;
                prev.subanswers.some(function (subanswer) {
                    rightSubanswer = subanswer;
                    return rightSubanswer.question.toString() === questionId
                }) ? callback(null, rightSubanswer) : callback();
            },
            question: function (callback, prev) {
                Question.findOne({_id: prev.subanswer.question}, callback);
            },
            user: function (callback) {
                User.findOne({_id: userId}, callback);
            }
        });
};

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