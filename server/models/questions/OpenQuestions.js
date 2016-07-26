var mongoose = require('mongoose');

var OpenQuestionSchema = new mongoose.Schema({
    question: {type: String, required: true}
}, {
    discriminatorKey: 'type'
});

OpenQuestionSchema.methods.getQuestion = function () {
    return {
        id: this.id,
        type: this.type,
        header: this.header,
        question: this.question,
        maxCost: this.maxCost
    };
};

mongoose.model('Question').discriminator('OpenQuestion', OpenQuestionSchema); 