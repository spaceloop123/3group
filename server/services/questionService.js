var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Test = mongoose.model('Test');
var TestTemplate = mongoose.model('TestTemplate');
var Answer = mongoose.model('Answer');
var Validator = require('../libs/requestValidator');
var testService = require('../services/testService');
var questionMap = require('../libs/questionMap');

module.exports.getQuestion = function (userId, testId, n, done) {
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
                Question.find({parent: undefined, type: prev.template.questions[n - 1]})
                    .populate('subQuestions').exec(callback);
            }
        });
}

module.exports.getSubquestion = function (userId, testId, questionId, done) {
    new Validator()
        .checkItems({
            test: function (callback) {
                Test.findOne({_id: testId, user: userId, status: 'run'}).populate('answers').exec(callback);
            },
            template: function (callback) {
                TestTemplate.findOne(callback);
            },
            question: function (callback, prev) {
                console.log('!');
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
        })
        .exec(function (res) {
            done(null, res.subquestion.getQuestion());
        }, done, done);
};

module.exports.addQuestions = function (questions) {
    questions.forEach(function (question, questions) {
        var newQuestion = new questionMap[question._type]();
        newQuestion.setQuestion(question);
        question._subQuestions.forEach(function (subQuestion, subQuestions) {
            var newSubQuestion = new questionMap[subQuestion._type];
            newSubQuestion.setQuestion(subQuestion);
            newQuestion.subQuestions.push(newSubQuestion.id);
            newSubQuestion.parent = newQuestion.id;
            newSubQuestion.save();
        });
        newQuestion.save();
    });
};