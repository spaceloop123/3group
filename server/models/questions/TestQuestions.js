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
        type: this.type,
        header: this.header,
        question: this.question,
        answers: this.answers
    };
};

mongoose.model('Question').discriminator('TestQuestion', TestQuestionsSchema);