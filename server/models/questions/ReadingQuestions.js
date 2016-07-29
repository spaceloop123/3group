var mongoose = require('mongoose');

var ReadingQuestionsSchema = new mongoose.Schema({
    text: {type: String, required: true},
    subQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true}]
}, {
    discriminatorKey: 'type'
});

ReadingQuestionsSchema.methods.getQuestion = function () {
    return {
        id: this.id,
        type: this.type,
        header: this.header,
        text: this.text,
        subQuestions: this.subQuestions
    }
};

ReadingQuestionsSchema.methods.setQuestion = function (question) {
    this.header = question._header;
    this.difficulty = question._difficulty;
    this.autoCheck = false;
    this.text = question._text;
};

mongoose.model('Question').discriminator('ReadingQuestion', ReadingQuestionsSchema);