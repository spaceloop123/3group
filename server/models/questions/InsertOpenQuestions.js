var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;

var InsertOpenQuestion = {
    questionParts: {type: [String], required: true}
};

var InsertOpenQuestionSchema = new mongoose.Schema(Object.extended(Question).merge(InsertOpenQuestion));

InsertOpenQuestionSchema.methods.getQuestion = function () {
    return {
        type: this.type,
        header: this.header,
        questionParts: this.questionParts
    };
};

mongoose.model('InsertOpenQuestion', InsertOpenQuestionSchema); 