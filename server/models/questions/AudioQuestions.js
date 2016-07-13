var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;
var TestQuestion = mongoose.model('TestQuestion');

var AudioQuestion = {
    path: {type: String, required: true},
    subQuestions: [{type: mongoose.Schema.Types.Mixed, ref: 'Question', required: true}]
};

var AudioQuestionsSchema = new mongoose.Schema(Object.extended(Question).merge(AudioQuestion));

AudioQuestionsSchema.methods.getQuestion = function () {
    var subQuestions = [];
    this.subQuestions.forEach(function (subQuestion, arr) {
        var question;
        switch(subQuestion.type) {
            case 'test':
                question = new TestQuestion(subQuestion);
                break;
        }
        subQuestions.push(question.getQuestion());
    });
    return {
        type: this.type,
        header: this.header,
        file: 'Здесь будет файл',
        subQuestions: subQuestions
    };
};

mongoose.model('AudioQuestion', AudioQuestionsSchema);