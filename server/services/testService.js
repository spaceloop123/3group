var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var TestTemplate = mongoose.model('TestTemplate');
var Question = mongoose.model('Question');
var async = require('async');
var Validator = require('../libs/requestValidator');

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
    var test = new Test({user: userId, status: 'requested'});
    test.save(function (err) {
        done(err);
    });
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

module.exports.getTestValidator = function validateTest(testOptions) {
    return new Validator().checkItems({
        test: function (callback) {
            Test.findOne(testOptions, callback);
        },
        template: function (callback) {
            TestTemplate.findOne(callback);
        }
    });
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

module.exports.endTest = function (testId, done) {
    Test.findOne({_id: testId}, function (err, test) {
        if (err) {
            done(err);
        } else {
            test.status = 'checking';
            test.finishTime = Date.now();
            test.save(function (err) {
                done(err);
            });
        }
    });
};

module.exports.getAnswers = function (testId, done) {
    var validator = new Validator();
    
    validator.checkItem('test', function (callback) {
        Test.findOne({_id: testId})
            .populate({path: 'answers', model: 'Answer'})
            .exec(callback);
    });
    
    validator.exec(function (res) {
       var response = res.test.getNotAutomaticallyCheckAnswers();
        done(null, {answers: response});
    }, done, done);
};

module.exports.getTeachersTests = function (teacher, done) {
    var validator = new Validator();
    var response = [];
    
    validator.checkItem('tests', function (callback) {
        Test.find({teacher: teacher, status: 'checking'}, callback);
    });

    validator.exec(function (res) {
        res.tests.forEach(function (test, tests) {
            response.push(test.getTestInfo());
        });
        done(null, response);
    }, function () {
        done(null, response);
    }, done);
};
