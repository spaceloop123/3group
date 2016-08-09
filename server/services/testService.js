var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var User = mongoose.model('User');
var TestTemplate = mongoose.model('TestTemplate');
var Question = mongoose.model('Question');
var async = require('async');
var Validator = require('../libs/requestValidator');
var notificationService = require('../services/notificationService');
var agenda = require('../libs/agenda');

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
        done(null, {
            status: res.test.status, count: res.template.questions.length,
            time: res.template.time, fromTime: res.test.fromTime, toTime: res.test.toTime
        });
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

        agenda.setTimer('test-timer', {userId: userId, testId: res.test.id}, res.template.time * 60 * 1000);

        done(null, {
            testId: res.test.id,
            count: res.template.questions.length,
            deadline: finishTime
        });
    }, done, done);
};

module.exports.changeTestStatus = function (status, testId, done) {
    new Validator()
        .checkItem('test', function (callback) {
            Test.findOne({_id: testId}).populate('user teacher').exec(callback);
        })
        .exec(function (res) {
            res.test.status = status;
            res.test.save();
            if (status === 'complete') {
                notificationService.createDoneNotification(res.test.user.id, res.test.teacher.id, testId);
            }
            done(null);
        }, done, done);
};

module.exports.finishTest = function (userId, testId, done) {
    new Validator()
        .checkItem('test', function (callback) {
            Test.findOne({_id: testId, user: userId, status: 'run'}, callback);
        })
        .exec(function (res) {
            res.test.status = 'checking';
            res.test.finishTime = new Date();
            res.test.save();
            done();
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
            Test.find({teacher: teacher, status: 'checking'}).populate('answers').exec(callback);
        })
        .exec(function (res) {
            res.tests.forEach(function (test, tests) {
                if (test.getNotAutomaticallyCheckAnswers().length !== 0) {
                    response.push(test.getTestInfo());
                }
            });
            done(null, response);
        }, function () {
            done(null, response);
        }, done);
};

module.exports.getTestsHistory = function (userId, testIds, done) {
    new Validator()
        .checkItems(testIds.map(function (testId) {
            return getTestHistory(userId, testId);
        }))
        .exec(function (res) {
            var response = [];
            for (key in res) {
                response.push(res[key]);
            }
            done(null, {tests: response});
        }, done, done);
};

function getTestHistory(userId, testId) {
    return function (done) {
        new Validator()
            .checkItem('test', function (callback) {
                Test.findOne({_id: testId, user: userId, status: 'complete'})
                    .populate({
                        path: 'answers',
                        populate: {path: 'question subAnswers', populate: {path: 'subAnswers.question'}}
                    })
                    .exec(callback);
            })
            .exec(function (res) {
                var testMap = getTestMap(res.test.answers);
                var questions = [];
                for (key in testMap) {
                    questions.push({
                        type: key,
                        mark: testMap[key].result / testMap[key].maxResult * 100 || 0
                    });
                }
                done(null, {
                    date: res.test.finishTime,
                    mark: res.test.result / res.test.maxResult * 100 || 0,
                    questions: questions
                });
            }, done, done);
    }
}

var typeMap = {
    TestQuestion: 'Test',
    InsertTestQuestion: 'Test',
    InsertOpenQuestion: 'Open',
    OpenQuestion: 'Open',
    AudioQuestion: 'Audio',
    ReadingQuestion: 'Reading',
    SpeechQuestion: 'Speech'
};

function getTestMap(answers) {
    var map = {};
    answers.forEach(function (answer) {
        var type = typeMap[answer.question.type];
        if (!map[type]) {
            map[type] = {
                result: 0,
                maxResult: 0
            }
        }

        var curAnswers = answer.subAnswers.length === 0 ? [answer] : answer.subAnswers;

        curAnswers.forEach(function (answer) {
            map[type].result += answer.mark;
            map[type].maxResult += answer.question.maxCost;
        });
    });
    return map;
}


module.exports.assignNewTest = function (userId, teacherId, timeFrom, timeTo, done) {
    var test = new Test({
        status: 'available',
        user: userId,
        teacher: teacherId,
        answers: [],
        fromTime: new Date(timeFrom),
        toTime: new Date(timeTo)
    });
    User.findOne({_id: userId}, function (err, user) {
        agenda.setTimer('send-mail', {
                to: user.email,
                subject: 'Your test',
                text: 'Your test will be available in hour'
            },
            test.fromTime.getTime() - new Date().getTime() - 3600000);
        agenda.setTimer('open-window', {testId: test.id}, test.fromTime.getTime() - new Date().getTime());
        test.save(function (err) {
            done(err);
        });
    });
};

module.exports.acceptTestRequest = function (testId, teacherId, timeFrom, timeTo, done) {
    new Validator()
        .checkItem('test', function (callback) {
            Test.findOne({_id: testId, status: 'requested'}, callback);
        })
        .exec(function (res) {
            res.test.status = 'wait';
            res.test.teacher = teacherId;
            res.test.answers = [];
            res.test.fromTime = new Date(timeFrom);
            res.test.toTome = new Date(timeTo);
            User.findOne({_id: res.test.user}, function (err, user) {
                agenda.setTimer('send-mail', {
                        to: user.email,
                        subject: 'Your test',
                        text: 'Your test will be available in hour'
                    },
                    res.test.fromTime.getTime() - new Date().getTime() - 3600000);
                agenda.setTimer('open-window', {testId: res.test.id}, res.test.fromTime.getTime() - new Date().getTime());
                res.test.save(function (err) {
                    done(err);
                });
            });
        }, done, done);
};