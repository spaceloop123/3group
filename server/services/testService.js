var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var TestTemplate = mongoose.model('TestTemplate');
var Question = mongoose.model('Question');
var async = require('async');
var Validator = require('../libs/requestValidator');

module.exports.getTestStatus = function (userId, done) {
    Test.findOne({user: userId, $or: [{status: 'available'}, {status: 'requested'}]},
        function (err, test) {
            err ? done(err) :
                test ? done(null, test.status) : done(null, 'notAvailable');
        });
};

module.exports.requestTest = function (userId, done) {
    var test = new Test({user: userId});
    test.save(done(err));
};

module.exports.initTest = function (userId, done) {
    var validator = new Validator();

    validator.checkItem('test',
        function (callback) {
            Test.findOne({user: userId, status: 'available'}, callback);
        },
        function (test, callback) {
            callback(null, test);
        });

    validator.checkItem('template',
        function (callback) {
            TestTemplate.findOne(callback);
        },
        function (template, callback) {
            callback(null, template);
        }
    );

    validator.validate(function (res) {
        res.test.status = 'run';
        res.test.save();

        done(null, {
            testId: res.test.id,
            time: res.template.time,
            count: res.template.questions.length,
            deadline: new Date()
        });
    }, done);
};
