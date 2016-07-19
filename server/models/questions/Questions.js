var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    header: {type: String, required: true},
    difficulty: Number,
    maxCost: Number,
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'}
}, {
    discriminatorKey: 'type'
});

QuestionSchema.methods.getQuestion = function () {
    return JSON.stringify(this);
};

mongoose.model('Question', QuestionSchema);