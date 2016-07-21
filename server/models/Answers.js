var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
    question: {type: mongoose.Schema.ObjectId, ref: 'Question', required: true},
    answer: [{type: String, required: true}]
});

mongoose.model('Answer', AnswerSchema);