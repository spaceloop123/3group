var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
    status: {type: String, enum: ['available', 'requested', 'checked', 'complete', 'run'], required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    fromTime: {type: Date, default: Date.now},
    toTime: {type: Date},
    finishTime: {type: Date},
    result: {type: Number, required: true, default: 0},
    maxResult: {type: Number, required: true, default: 0}
});

TestSchema.methods.getTestInfo = function () {
    return {
        id: this.id,
        date: this.finishTime
    };
};

TestSchema.methods.getNotAutomaticallyCheckAnswers = function () {
    var answers = [];
    this.answers.forEach(function(answer, arr) {
        if(!answer.autoCheck) {
            answers.push(answer.getAnswerId());
        }
    });
    return answers;
};

mongoose.model('Test', TestSchema);