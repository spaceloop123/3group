var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var AudioQuestion = mongoose.model('AudioQuestion');
var TestQuestion = mongoose.model('TestQuestion');
var ReadingQuestion = mongoose.model('ReadingQuestion');
var SpeechQuestion = mongoose.model('SpeechQuestion');

var mdlwares = require('../libs/mdlwares');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

function addQuestion() {
    var question1 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        type: 'test',
        question: 'My mother _____ to stay with us next weekend.',
        answers: ['a. comes', 'b. is coming', 'c. came'],
        correctAnswer: 'a'
    });
    var question2 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        type: 'test',
        question: 'Be careful, you’ve made _____.',
        answers: ['a. the mistake', 'b. mistake', 'c. a mistake'],
        correctAnswer: 'a'
    });
    var question3 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        type: 'test',
        question: 'Can you explain this word _____me?',
        answers: ['a. for', 'b. to', 'c. by'],
        correctAnswer: 'a'
    });
    var question4 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        type: 'test',
        question: 'There is _____waiting for you in the lobby.',
        answers: ['a. anybody', 'b. somebody', 'c. nobody'],
        correctAnswer: 'b'
    });
    var question5 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        type: 'test',
        question: 'I didn’t hear the alarm clock and slept until eight _____.',
        answers: ['a. hour', 'b. o’clock', 'c. hours'],
        correctAnswer: 'b'
    });
    question1.save();
    question2.save();
    question3.save();
    question4.save();
    question5.save();
}

function getQuestion(type) {
    var questionTypes = [];
    questionTypes.test = TestQuestion;
    questionTypes.reading = ReadingQuestion;
    questionTypes.audition = AudioQuestion;
    questionTypes.speech = SpeechQuestion;
    questionTypes[type].findOne({type: type}, function (err, question) {
        console.log(question.getQuestion());
    });
}

module.exports = router;
