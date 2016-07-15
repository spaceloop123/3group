var mongoose = require('mongoose');

var AudioQuestionsSchema = new mongoose.Schema({
    path: {type: String, required: true},
    subQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true}]
}, {
    discriminatorKey: 'type'
});

AudioQuestionsSchema.methods.getQuestion = function () {
    var subQuestions = [];
    this.subQuestions.forEach(function (subQuestion, arr) {
        subQuestions.push(subQuestion.getQuestion());
    });
    return {
        type: this.type,
        header: this.header,
        file: 'Здесь будет файл',
        subQuestions: subQuestions
    };
};

mongoose.model('Question').discriminator('AudioQuestion', AudioQuestionsSchema);