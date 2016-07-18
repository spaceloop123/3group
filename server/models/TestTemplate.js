var mongoose = require('mongoose');

var TestTemplateSchema = new mongoose.Schema({
    questions: {type: [String], required: true},
    time: {type: Date, default: Date.now, required: true}
});

mongoose.model('TestTemplate', TestTemplateSchema);