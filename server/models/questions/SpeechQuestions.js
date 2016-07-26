var mongoose = require('mongoose');

var SpeechQuestionsSchema = new mongoose.Schema({
    question: {type: String, required: true}
}, {
    discriminatorKey: 'type'
});

SpeechQuestionsSchema.methods.getQuestion = function () {
    return {
        id: this.id,
        type: this.type,
        header: this.header,
        question: this.question,
        maxCost: this.maxCost
    };
};

mongoose.model('Question').discriminator('SpeechQuestion', SpeechQuestionsSchema);