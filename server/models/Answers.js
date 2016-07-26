var mongoose = require('mongoose');
var Question = mongoose.model('Question');

var AnswerSchema = new mongoose.Schema({
    question: {type: mongoose.Schema.ObjectId, ref: 'Question', required: true},
    answer: {type: String, required: true},
    subAnswers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'},
    autoCheck: {type: Boolean, required: true, default: false}
});

AnswerSchema.methods.getAnswerId = function() {
  return {
      id: this.id,
      subAnswersId: this.subAnswersId
  };  
};

AnswerSchema.methods.getAnswer = function () {
    var subAnswers = [];
    subAnswers.forEach(function (answer, answers) {
       subAnswers.push(answer.getAnswer()); 
    });
    return {
        question: this.question.getQuestion(),
        answer: this.answer,
        subAnswers: subAnswers
    }
};

mongoose.model('Answer', AnswerSchema);