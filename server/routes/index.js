var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var TestQuestion = mongoose.model('TestQuestion');
var InsertTestQuestion = mongoose.model('InsertTestQuestion');
var ReadingQuestion = mongoose.model('ReadingQuestion');
var AudioQuestion = mongoose.model('AudioQuestion');
var OpenQuestion = mongoose.model('OpenQuestion');
var SpeechQuestion = mongoose.model('SpeechQuestion');
var Test = mongoose.model('Test');

/* GET home page. */
router.get('/', function (req, res, next) {
    var test = new Test({
        status: 'cheked'
    });
    res.render('index');
});

function addQuestion() {
    var question1 = new SpeechQuestion({
        header: 'Give answers for the following questions and record them',
        difficulty: 20,
        maxCost: 10,
        question: 'When did you feel annoyed last time?'
    });
    var question2 = new SpeechQuestion({
        header: 'Give answers for the following questions and record them',
        difficulty: 20,
        maxCost: 10,
        question: 'What other country of the world would you like to live in? Why?'
    });
    question1.save();
    question2.save();
}

router.get('/qtest', function (req, res) {
    Question.findOne({parent: undefined, type: 'AudioQuestion'}).populate('subQuestions').exec(function (err, q) {
        console.log(q.getQuestion());
    });
    res.end();
});

module.exports = router;
