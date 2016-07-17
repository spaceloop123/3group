var mongoose = require('mongoose');

var TestTemplateSchema = new mongoose.Schema({
    questions: {type: [String], required: true}
});

mongoose.model('TestTemplate', TestTemplateSchema);