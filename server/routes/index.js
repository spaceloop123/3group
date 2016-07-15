var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var AudioQuestion = mongoose.model('AudioQuestion');
var TestQuestion = mongoose.model('TestQuestion');
var OpenQuestion = mongoose.model('OpenQuestion');

/* GET home page. */
router.get('/', function (req, res, next) {
//    addQuestion();
//    getQuestion('speech');
    res.render('index');
});

function addQuestion() {
    var question1 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        question: 'My mother _____ to stay with us next weekend.',
        answers: ['a. comes', 'b. is coming', 'c. came'],
        correctAnswer: 'a'
    });
    var question2 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        question: 'Be careful, you’ve made _____.',
        answers: ['a. the mistake', 'b. mistake', 'c. a mistake'],
        correctAnswer: 'a'
    });
    var question3 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        question: 'Can you explain this word _____me?',
        answers: ['a. for', 'b. to', 'c. by'],
        correctAnswer: 'a'
    });
    var question4 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        question: 'There is _____waiting for you in the lobby.',
        answers: ['a. anybody', 'b. somebody', 'c. nobody'],
        correctAnswer: 'b'
    });
    var question5 = new TestQuestion({
        header: 'Choose the correct variant',
        difficulty: 5,
        maxCost: 10,
        question: 'I didn’t hear the alarm clock and slept until eight _____.',
        answers: ['a. hour', 'b. o’clock', 'c. hours'],
        correctAnswer: 'b'
    });
    var q6 = new OpenQuestion({
        header: 'Write the correct variant',
        difficulty: 5,
        maxCost: 10,
        question: 'I didn’t hear the alarm clock and slept until eight _____.',
    });
    var q7 = new OpenQuestion({
        header: 'Write the correct variant',
        difficulty: 5,
        maxCost: 10,
        question: 'I didn’t clock and slept until eight _____.',
    });
    var q8 = new AudioQuestion({
        header: 'Listen the story',
        difficulty: 5,
        maxCost: 10,
        path: 'здесь будет путь к файлу'
    });
    q8.subQuestions.push(question2.id);
    q8.subQuestions.push(question3.id);
    q8.subQuestions.push(q6.id);
    question2.parent = q8.id;
    question3.parent = q8.id;
    q6.parent = q8.id;
    question1.save();
    question2.save();
    question3.save();
    question4.save();
    question5.save();
    q6.save();
    q7.save();
    q8.save();
}

function getQuestion(res, type) {
    var questionTypes = [];
    questionTypes.test = TestQuestion;
    questionTypes.reading = ReadingQuestion;
    questionTypes.audition = AudioQuestion;
    questionTypes.speech = SpeechQuestion;
    questionTypes[type].findOne({type: type}, function (err, question) {
        res.send(question.getQuestion());
    });
}

router.get('/qtest', function (req, res) {
    Question.findOne({parent: undefined, type: 'AudioQuestion'}).populate('subQuestions').exec(function (err, q) {
        console.log(q.getQuestion());
    });
    res.end();
});

module.exports = router;
