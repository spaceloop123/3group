var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var TestTemplate = mongoose.model('TestTemplate');
var Question = mongoose.model('Question');
var async = require('async');
var Validator = require('../libs/requestValidator');
var notificationService = require('../services/notificationService');

module.exports.getTestValidator = function validateTest(findOptions, populateOptions) {
    return new Validator().checkItems({
        test: function (callback) {
            populateOptions = populateOptions || '';
            Test.findOne(findOptions).populate(populateOptions).exec(callback);
        },
        template: function (callback) {
            TestTemplate.findOne(callback);
        }
    });
};

module.exports.getTestStatus = function (userId, done) {
    module.exports.getTestValidator({
        user: userId,
        status: {$in: ['available', 'requested', 'run']}
    }).exec(function (res) {
        done(null, {status: res.test.status, time: res.template.time, count: res.template.questions.length});
    }, function () {
        done(null, {status: 'notAvailable'});
    }, done);
};

module.exports.requestTest = function (userId, done) {
    new Validator()
        .checkItem('test', function (callback) {
            Test.findOne({user: userId, status: {$in: ['available', 'requested', 'run']}}, callback);
        })
        .exec(function () {
            done();
        }, function () {
            var test = new Test({user: userId, status: 'requested'});
            test.save();
            notificationService.createRequestNotification(userId, test.id);
            done()
        }, done);
};

module.exports.initTest = function (userId, done) {
    module.exports.getTestValidator({user: userId, status: 'available'}).exec(function (res) {
        var finishTime = new Date();
        finishTime.setMinutes(finishTime.getMinutes() + res.template.time);
        res.test.status = 'run';
        res.test.finishTime = finishTime;
        res.test.save();

        setTimer(res.test.id, res.template.time * 60 * 1000);

        done(null, {
            testId: res.test.id,
            count: res.template.questions.length,
            deadline: finishTime
        });
    }, done, done);
};

function setTimer(testId, delay) {
    setTimeout(function () {
        require('mongoose').model('Test').findOne({_id: testId, status: 'run'}, function (err, test) {
            if (!err && test) {
                test.status = 'checking';
                test.save();
            }
        });
    }, delay);
}

module.exports.changeTestStatus = function (status, testId, done) {
    new Validator()
        .checkItem('test', function (callback) {
            Test.findOne({_id: testId}).populate('user teacher').exec(callback);
        })
        .exec(function (res) {
            res.test.status = status;
            res.test.save();
            if(status === 'complete') {
                notificationService.createDoneNotification(res.test.user.id, res.test.teacher.id, testId);
            }
            done(null);
        }, done, done);
};

module.exports.getAnswers = function (testId, done) {
    new Validator()
        .checkItem('test', function (callback) {
            Test.findOne({_id: testId})
                .populate({
                    path: 'answers',
                    populate: {
                        path: 'subAnswers'
                    }
                })
                .exec(callback);
        })
        .exec(function (res) {
            var response = res.test.getNotAutomaticallyCheckAnswers();
            done(null, {answers: response});
        }, done, done);
};

module.exports.getTeachersTests = function (teacher, done) {
    var response = [];

    new Validator()
        .checkItem('tests', function (callback) {
            Test.find({teacher: teacher, status: 'checking'}, callback);
        })
        .exec(function (res) {
            res.tests.forEach(function (test, tests) {
                response.push(test.getTestInfo());
            });
            done(null, response);
        }, function () {
            done(null, response);
        }, done);
};

module.exports.getTestHistoryByUser = function (userId, testId, done) {
    new Validator()
        .checkItem('test', function (callback) {
            Test.findOne({_id: testId, user: userId, status: 'complete'})
                .populate({
                    path: 'answers',
                    populate: {
                        path: 'question'
                    }
                }).exec(callback);
        })
        .exec(function (res) {
            var questions = res.test.answers.map(function (answer) {
                var type;
                switch (answer.question.type) {
                    case TestQuestion:
                    case InsertTestQuestion:
                        type = 'Test';
                        break;
                    case InsertOpenQuestion:
                    case OpenQuestion :
                        type = 'Open';
                        break;
                    case AudioQuestion:
                        type = 'Audio';
                        break;
                    case ReadingQuestion:
                        type = 'Reading';
                        break;
                    case SpeechQuestion:
                        type = 'Speech';
                        break;
                }
                return {
                    type: type,
                    result: answer.mark,
                    maxResult: answer.question.maxCost
                }
            });
            var results = {};
            questions.forEach(function (question) {
                if (!results[question.type]) {
                    results[question.type] = {
                        result: 0,
                        maxResult: 0
                    }
                }
                results[question.type].result += question.result;
                results[question.type].maxResult += question.maxResult;
            });
            var response = [];
            for (key in results) {
                response.push({
                    type: key,
                    mark: results[key].result / results[key].maxResult * 100
                })
            }
            done(null, {questions: response});
        }, done, done);
};