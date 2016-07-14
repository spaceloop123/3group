var mongoose = require('mongoose');
var sugar = require('sugar');
var Question = require('./Questions').QuestionInterface;
var TestQuestion = mongoose.model('TestQuestion');

var ReadingQuestion = {
    text: {type: String, required: true},
    subQuestions: [{type: mongoose.Schema.Types.Mixed, ref: 'Question', required: true}]
};

var ReadingQuestionsSchema = new mongoose.Schema(Object.extended(Question).merge(ReadingQuestion));

ReadingQuestionsSchema.methods.getQuestion = function () {
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
        text: this.text,
        subQuestions: subQuestions
    }
};

mongoose.model('ReadingQuestion', ReadingQuestionsSchema);