var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;

var ReadingQuestion = {
    text: {type: String, required: true},
    subQuestions: [{type: String, required: true}]
};

var ReadingQuestionsSchema = new mongoose.Schema(Object.extended(Question).merge(ReadingQuestion));

mongoose.model('ReadingQuestion', ReadingQuestionsSchema, 'questions');