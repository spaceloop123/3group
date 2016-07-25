var mongoose = require('mongoose');
var Question = mongoose.model('Question');

var Test = mongoose.model('Test');
var TestTemplate = mongoose.model('TestTemplate');

module.exports.getQuestionByNumber = function (userId, testId, n, done) {
    async.series(validateQuestionRequest(userId, testId), function (err, res) {
            if (res.answersCount && res.testSchema &&
                n <= res.testSchema.length && n === res.answersCount + 1) {

                Question.find({parent: undefined, type: res.testSchema[n - 1]},
                    function (err, questions) {
                        if (questions) {
                            var question = questions[Math.floor(Math.random() * questions.length)];
                            done(null, question.getQuestion());
                        } else {
                            err ? done(err) : done();
                        }

                    });

            } else {
                err ? done(err) : done();
            }
        }
    );
};

function validateQuestionRequest(userId, testId) {
    return {
        answersCount: function (callback) {
            Test.findOne({_id: testId, user: userId, status: 'run'}, function (err, test) {
                err ? done(err) :
                    test ? done(null, test.answers.length) : done();

            });
        },
        testSchema: function (callback) {
            TestTemplate.findOne(function (err, template) {
                err ? done(err) :
                    template ? done(null, template.schema) : done();
            });
        }
    };
}

module.exports.getQuestionById = function (userId, testId, questionId, done) {
    var tasks = {
        test: function (callback) {
            Test.findOne({user: userId, status: 'run'}, function (err, test) {
                err ? done(err) :
                    test ? done(null, test.answers.length) : done();

            });
        }
    };
};