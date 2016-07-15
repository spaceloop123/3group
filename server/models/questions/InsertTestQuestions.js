var mongoose = require('mongoose');

var InsertTestQuestion = {
    questionParts: {type: [String], required: true},
    answers: {type: [String], required: true},
    correctAnswer: {type: String, required: true}
};

var InsertTestQuestionSchema = new mongoose.Schema({
    questionParts: {type: [String], required: true},
    answers: {type: [String], required: true},
    correctAnswer: {type: String, required: true}
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