var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
    status: {type: String, enum: ['available', 'requested', 'checked', 'complete']},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    fromTime: {type: Date, default: Date.now, required: true},
    toTime: {type: Date, required: true}
});

mongoose.model('Test', TestSchema);