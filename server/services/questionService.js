var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Test = mongoose.model('Test');
var TestTemplate = mongoose.model('TestTemplate');
var Validator = require('../libs/requestValidator');

module.exports.getQuestionByNumber = function (userId, testId, n, done) {
    var validator = new Validator();

    validator.checkItems({
        test: function (callback) {
            Test.findOne({_id: testId, user: userId, status: 'run'}, callback);
        },
        template: function (callback) {
            TestTemplate.findOne(callback);
        },
        rightNumber: function (callback, prev) {
            (n <= prev.template.questions.length && n === prev.test.answers.length) ? callback(null, {}) : callback();
        },
        question: function (callback, prev) {
            Question.find({parent: undefined, type: prev.template.questions[n - 1]}, callback);
        }
    });

    validator.exec(function (res) {
        var question = res.questions[Math.floor(Math.random() * res.questions.length)];
        done(null, question.getQuestion());
    }, done);
};

module.exports.getQuestionById = function (userId, testId, questionId, done) {
    var validator = new Validator();

    validator.checkItem('test', function (callback) {
        Test.findOne({_id: testId, user: userId, status: 'run'}, callback);
    });

    validator.checkItem('rightQuestion', function (callback, prev) {

    });
};