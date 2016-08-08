var mongoose = require('mongoose');
var fs = require('fs');

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
        path: '../../../temp/' + this.path,
        subQuestions: this.subQuestions.map(function (item) {
            return item.id;
        })
    };
};

AudioQuestionsSchema.methods.createTempFile = function () {
    fs.createReadStream('../../assets/' + path).pipe(fs.createWriteStream('../../../temp/' + path));
};

AudioQuestionsSchema.methods.deleteTempFile = function () {
    fs.unlink('../../../temp/' + path);
};

mongoose.model('Question').discriminator('AudioQuestion', AudioQuestionsSchema);