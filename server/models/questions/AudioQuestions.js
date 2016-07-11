var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;

var AudioQuestion = {
    path: {type: String, required: true},
    subQuestions: [{type: String, required: true}]
};

var AudioQuestionsSchema = new mongoose.Schema(Object.extended(Question).merge(AudioQuestion));

mongoose.model('AudioQuestion', AudioQuestionsSchema, 'questions');