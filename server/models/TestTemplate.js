var mongoose = require('mongoose');

var TestTemplateSchema = new mongoose.Schema({
    questions: [{type: mongoose.Schema.Types.Mixed, required: true}]
});

mongoose.model('TestTemplate', TestTemplateSchema);