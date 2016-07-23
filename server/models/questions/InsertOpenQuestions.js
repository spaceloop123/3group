var mongoose = require('mongoose');

var InsertOpenQuestionSchema = new mongoose.Schema({
    questionParts: {type: [String], required: true}
}, {
    discriminatorKey: 'type'
});

InsertOpenQuestionSchema.methods.getQuestion = function () {
    return {
        id: this.id,
        type: this.type,
        header: this.header,
        questionParts: this.questionParts
    };
};

mongoose.model('Question').discriminator('InsertOpenQuestion', InsertOpenQuestionSchema); 