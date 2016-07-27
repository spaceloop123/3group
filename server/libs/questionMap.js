var mongoose = require('mongoose');

var map = {};
map['TestQuestion'] = mongoose.model('TestQuestion');
map['OpenQuestion'] = mongoose.model('OpenQuestion');
map['InsertTestQuestion'] = mongoose.model('InsertTestQuestion');
map['InsertOpenQuestion'] = mongoose.model('InsertOpenQuestion');
map['ReadingQuestion'] = mongoose.model('ReadingQuestion');
map['AudioQuestion'] = mongoose.model('AudioQuestion');
map['SpeechQuestion'] = mongoose.model('SpeechQuestion');

module.exports = map;