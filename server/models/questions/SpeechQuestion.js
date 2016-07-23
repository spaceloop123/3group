var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;

var SpeechQuestion = {
    question: {type: String, required: true}
};

var SpeechQuestionsSchema = new mongoose.Schema(Object.extended(Question).merge(SpeechQuestion));

SpeechQuestionsSchema.methods.getQuestion = function () {
    return {
        id: this.id,
        type: this.type,
        header: this.header,
        question: this.question
    };
};

mongoose.model('SpeechQuestion', SpeechQuestionsSchema);