var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;

var TestQuestion = {
    question: {type: String, required: true},
    answers: {type: [String], required: true},
    correctAnswer: {type: String, required: true}
};

var TestQuestionsSchema = new mongoose.Schema(Object.extended(Question).merge(TestQuestion));

mongoose.model('TestQuestion', TestQuestionsSchema);