var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;

var SpeechQuestion = {
    subQuestions: [{type: String, required: true}]
};

var SpeechQuestionsSchema = new mongoose.Schema(Object.extended(Question).merge(SpeechQuestion));

mongoose.model('SpeechQuestion', SpeechQuestionsSchema, 'questions');