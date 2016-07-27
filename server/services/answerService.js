var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Validator = require('../libs/requestValidator');

module.exports.getAnswerById = function (answerId, done) {
    var validator = new Validator();
    
    validator.checkItem('answer', function (callback) {
        Answer.findOne({_id: answerId}).populate('question').exec(callback);
    });
    
    validator.exec(function (res) {
        done(null, res.answer.getAnswer());
    }, done, done);
};