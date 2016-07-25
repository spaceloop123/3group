var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
    question: {type: mongoose.Schema.ObjectId, ref: 'Question', required: true},
    answer: {type: String, required: true},
    subAnswers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'},
    autoCheck: {type: Boolean, required: true, default: false}
});

AnswerSchema.methods.getAnswer = function() {
  return {
      id: this.id,
      subAnswersId: this.subAnswersId
  };  
};

mongoose.model('Answer', AnswerSchema);