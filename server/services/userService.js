var mongoose = require('mongoose');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var Validator = require('../libs/requestValidator');
var testService = require('./testService');
var async = require('async');

module.exports.getUserList = function (n, filter, done) {
    var CHUNK_COUNT = 10;
    var regExp = new RegExp('^.*' + filter + '.*$', "i");

    new Validator()
        .checkItem('users', function (callback) {
            User.find({
                $or: [
                    {firstName: regExp},
                    {lastName: regExp},
                    {role: regExp}
                ]
            }, callback);
        })
        .exec(function (res) {
            done(null, res.users.slice(n, (n + CHUNK_COUNT >= res.users.length ? res.users.length : n + CHUNK_COUNT)).map(function (item) {
                return item.getInfo();
            }));
        }, done, done);
};

module.exports.getTeachersList = function (done) {
    new Validator()
        .checkItem('teachers', function (callback) {
            User.find({role: 'teacher'}, callback);

        })
        .exec(function (res) {
            var response = [];
            var tasks = [];
            res.teachers.forEach(function (teacher) {
                tasks.push(function (callback) {
                    testService.getTeachersTests(teacher.id, function (err, tests) {
                        response.push({
                            id: teacher.id,
                            firstName: teacher.firstName,
                            lastName: teacher.lastName,
                            n: tests.length
                        });
                        callback();
                    })
                });
            });
            async.parallel(tasks, function (err) {
                err ? done(err) : done(null, response);
            });
        }, done, done);
};

module.exports.getUserHistory = function (userId, done) {
    new Validator()
        .checkItem('tests', function (callback) {
            Test.find({user: userId, status: 'complete'}, callback);
        })
        .exec(function (res) {
            res.tests.sort(function (firstTest, secondTest) {
                return firstTest.finishTime - secondTest.finishTime;
            });
            var historyMap = getHistoryMap(res.tests);
            var response = [];
            for (key in historyMap) {
                response.push({
                    date: new Date(+key),
                    tests: historyMap[key].tests,
                    mark: historyMap[key].sumMark / historyMap[key].tests.length
                });
            }
            done(null, {nodes: response});
        }, done, done);
};

function getHistoryMap(tests) {
    var historyMap = {};
    tests.forEach(function (test) {
        var key = test.finishTime.setHours(0, 0, 0, 0);
        if (!historyMap[key]) {
            historyMap[key] = {
                tests: [],
                sumMark: 0
            }
        }

        historyMap[key].tests.push(test.id);
        historyMap[key].sumMark += test.result / test.maxResult * 100 || 0;
    });
    return historyMap;
}

module.exports.checkGuest = function (guestId, done) {
    new Validator()
        .checkItems({
            test: function (callback) {
                Test.findOne({user: guestId, status: 'available'}, callback);
            },
            guest: function (callback) {
                User.findOne({_id: guestId}, callback);
            }
        })
        .exec(function (res) {
            done(null, res.guest);
        }, done, done);
};

module.exports.getUserInfo = function (userId, done) {
    new Validator()
        .checkItem('user', function (callback) {
            User.findOne({_id: userId}, callback);
        })
        .exec(function (res) {
            var info = res.user.getMoreInfo();
            if(res.user.role === 'teacher') {
                Test.count({teacher: res.user.id, status: 'checking'}, function (err, count) {
                    info.n = count;
                    done(null, info);
                });
            } else {
                Test.find({user: res.user.id, status: {$in: ['available', 'requested', 'run', 'wait']}}, function (err, tests) {
                    info.assignable = !(tests.length > 0);
                    done(null, info);
                });
            }
        }, done, done);
};