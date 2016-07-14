var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;

var TestQuestion = {
    question: {type: String, required: true},
    answers: {type: [String], required: true},
    correctAnswer: {type: String, required: true}
};

var TestQuestionsSchema = new mongoose.Schema(Object.extended(Question).merge(TestQuestion));

TestQuestionsSchema.methods.getQuestion = function () {
    return {
        type: this.type,
        header: this.header,
        question: this.question,
        answers: this.answers
    };
};

mongoose.model('TestQuestion', TestQuestionsSchema);