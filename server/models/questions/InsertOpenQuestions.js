var mongoose = require('mongoose');

var InsertOpenQuestion = {
    questionParts: {type: [String], required: true}
};

var InsertOpenQuestionSchema = new mongoose.Schema({
    questionParts: {type: [String], required: true}
});

InsertOpenQuestionSchema.methods.getQuestion = function () {
    return {
        type: this.type,
        header: this.header,
        questionParts: this.questionParts
    };
};

mongoose.model('Question').discriminator('InsertOpenQuestion', InsertOpenQuestionSchema); 