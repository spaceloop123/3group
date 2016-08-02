var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Test = mongoose.model('Test');
var TestTemplate = mongoose.model('TestTemplate');
var Answer = mongoose.model('Answer');
var Validator = require('../libs/requestValidator');
var testService = require('../services/testService');
var questionMap = require('../libs/questionMap');

module.exports.getQuestion = function (userId, testId, n, done) {
    validateQuestionRequest(userId, testId, n).exec(function (res) {
        done(null, {question: res.question.getQuestion()});
    }, done, done);
};

function validateQuestionRequest(userId, testId, n) {
    return testService.getTestValidator({_id: testId, user: userId, status: 'run'}, 'answers')
        .checkItems({
            newQuestion: function (callback, prev) {
                var maxCount = prev.template.questions.length;
                var curCount = prev.test.answers.length;

                n <= maxCount ?
                    n === curCount || n === curCount + 1 ?
                        callback(null, !(n === curCount)) :
                        callback() : callback()
            },
            question: function (callback, prev) {
                prev.newQuestion ?
                    getNewQuestion(prev.test, prev.template.questions[n - 1], callback) :
                    Question.findOne({_id: prev.test.answers[n - 1].question}).populate('subQuestions').exec(callback);
            }
        });
}

function getNewQuestion(test, type, callback) {
    Question.find({parent: undefined, type: type}).populate('subQuestions').exec(function (err, questions) {
        if (err) return callback(err);
        if (!questions) return callback();

        var question = questions[Math.floor(Math.random() * questions.length)];
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
        test.answers.push(answer.id);
        answer.save();
        test.save();
        callback(null, question);
    });
}

module.exports.getSubquestion = function (userId, testId, questionId, done) {
    validateSubquestionRequest(userId, testId, questionId).exec(function (res) {
        done(null, {question: res.subquestion.getQuestion()});
    }, done, done);
};

function validateSubquestionRequest(userId, testId, questionId) {
    return testService.getTestValidator({_id: testId, user: userId, status: 'run'}, 'answers')
        .checkItems({
            question: function (callback, prev) {
                var answers = prev.test.answers;
                Question.findOne({_id: answers[answers.length - 1].question.toString()}, callback);
            },
            subquestions: function (callback, prev) {
                prev.question.subQuestions ? callback(null, prev.question.subQuestions) : callback();
            },
            rightId: function (callback, prev) {
                prev.subquestions.some(function (id) {
                    return id.toString() === questionId;
                }) ? callback(null, {}) : callback();
            },
            subquestion: function (callback) {
                Question.findOne({_id: questionId}, callback);
            }
        });
}

module.exports.addQuestions = function (questions) {
    questions.forEach(function (question) {
        var newQuestion = new questionMap[question._type]();
        newQuestion.setQuestion(question);
        if (question._subQuestions !== undefined) {
            question._subQuestions.forEach(function (subQuestion) {
                var newSubQuestion = new questionMap[subQuestion._type];
                newSubQuestion.setQuestion(subQuestion);
                newQuestion.subQuestions.push(newSubQuestion.id);
                newSubQuestion.parent = newQuestion.id;
                newSubQuestion.save();
            });
        }
        newQuestion.save();
    });
};