var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;

var OpenQuestion = {
    question: {type: String, required: true}
};

var OpenQuestionSchema = new mongoose.Schema(Object.extended(Question).merge(OpenQuestion));

OpenQuestionSchema.methods.getQuestion = function () {
    return {
        type: this.type,
        header: this.header,
        question: this.question
    };
};

mongoose.model('OpenQuestion', OpenQuestionSchema); 