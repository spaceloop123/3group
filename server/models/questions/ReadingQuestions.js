var mongoose = require('mongoose');

var ReadingQuestionsSchema = new mongoose.Schema({
    text: {type: String, required: true},
    subQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true}]
}, {
    discriminatorKey: 'type'
});

ReadingQuestionsSchema.methods.getQuestion = function () {
    var subQuestions = [];
    this.subQuestions.forEach(function (subQuestion, arr) {
        subQuestions.push(subQuestion.getQuestion());
    });
    return {
        type: this.type,
        header: this.header,
        text: this.text,
        subQuestions: subQuestions
    }
};

mongoose.model('Question').discriminator('ReadingQuestion', ReadingQuestionsSchema);