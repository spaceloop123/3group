var mongoose = require('mongoose');

var InsertTestQuestionSchema = new mongoose.Schema({
    questionParts: {type: [String], required: true},
    answers: {type: [String], required: true},
    correctAnswer: {type: String, required: true}
}, {
    discriminatorKey: 'type'
});

InsertTestQuestionSchema.methods.getQuestion = function () {
    return {
        type: this.type,
        header: this.header,
        questionParts: this.questionParts,
        answers: this.answers
    };
};

mongoose.model('Question').discriminator('InsertTestQuestion', InsertTestQuestionSchema);