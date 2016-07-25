var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
    question: {type: mongoose.Schema.ObjectId, reg: 'Question', required: true},
    answer: {type: String, required: true},
    subAnswers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}
});

mongoose.model('Answer', AnswerSchema);