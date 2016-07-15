var mongoose = require('mongoose');

var QuestionInterface = {
    header: {type: String, required: true},
    difficulty: {type: Number},
    maxCost: {type: Number},
    type: {type: String, enum: ['test', 'open', 'insertTest', 'insertOpen', 'reading', 'audition', 'speech', 'essay'], required: true}
};

var QuestionSchema = new mongoose.Schema(QuestionInterface);

QuestionSchema.methods.getQuestion = function () {
    return JSON.stringify(this);
};

mongoose.model('Question', QuestionSchema);

module.exports.QuestionInterface = QuestionInterface;