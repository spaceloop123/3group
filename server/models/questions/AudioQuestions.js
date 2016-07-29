var mongoose = require('mongoose');

var AudioQuestionsSchema = new mongoose.Schema({
    path: {type: String, required: true},
    subQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true}]
}, {
    discriminatorKey: 'type'
});

AudioQuestionsSchema.methods.getQuestion = function () {
    return {
        id: this.id,
        type: this.type,
        header: this.header,
        file: this.path,
        subQuestions: this.subQuestions.map(function (item) {
            return item.id;
        })
    };
};

mongoose.model('Question').discriminator('AudioQuestion', AudioQuestionsSchema);