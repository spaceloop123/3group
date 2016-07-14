var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;

var InsertTestQuestion = {
    questionParts: {type: [String], required: true},
    answers: {type: [String], required: true},
    correctAnswer: {type: String, required: true}
};

var InsertTestQuestionSchema = new mongoose.Schema(Object.extended(Question).merge(InsertTestQuestion));

InsertTestQuestionSchema.methods.getQuestion = function () {
    return {
        type: this.type,
        header: this.header,
        questionParts: this.questionParts,
        answers: this.answers
    };
};

mongoose.model('InsertTestQuestion', InsertTestQuestionSchema);