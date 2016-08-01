var mongoose = require('mongoose');
var User = mongoose.model('User');
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
                tasks.push(function(callback) {
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