var mongoose = require('mongoose');

var TestsSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});