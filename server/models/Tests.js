var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
    status: {type: String, enum: ['available', 'requested', 'checked', 'complete'], required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    fromTime: {type: Date, default: Date.now},
    toTime: {type: Date},
    finishTime: {type: Date}
});

TestSchema.methods.getTestInfo = function () {
    return {
        id: this.id,
        date: this.finishTime
    };
};

TestSchema.methods.getAnswers = function () {
    return {answers: this.answers};
};

mongoose.model('Test', TestSchema);