var mongoose = require('mongoose');

var TestQuestionsSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answers: {type: [String], required: true},
    correctAnswer: {type: String, required: true}
}, {
    discriminatorKey: 'type'
});

TestQuestionsSchema.methods.getQuestion = function () {
    return {
        id: this.id,
        type: this.type,
        header: this.header,
        question: this.question,
        answers: this.answers,
        maxCost: this.maxCost
    };
};

TestQuestionsSchema.methods.setQuestion = function (question) {
    this.header = question.header;
    this.difficulty = question.difficulty;
    this.maxCost = question.maxCost;
    this.autoCheck = true;
    this.question = question.question;
    this.answers = question.answers;
    this.correctAnswer = question.answers[question.correctAnswer];
};

mongoose.model('Question').discriminator('TestQuestion', TestQuestionsSchema);