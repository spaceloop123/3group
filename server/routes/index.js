var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var AudioQuestion = mongoose.model('AudioQuestion');
var TestQuestion = mongoose.model('TestQuestion');
var ReadingQuestion = mongoose.model('ReadingQuestion');
//var SpeechQuestion = mongoose.model('SpeechQuestion');

var mdlwares = require('../libs/mdlwares');

/* GET home page. */
router.get('/',  function(req, res, next) {
  //addQuestion();
  //getQuestion('reading');
  res.render('index');
});

function addQuestion() {
  var question  = new ReadingQuestion({
    header: 'Give answers for the following questions and record them',
    difficulty: 25,
    dependent: false,
    type: 'speech'
  });

  var subQuestion1 = new TestQuestion({
    header: 'Mark the statements below as TRUE or FALSE',
    maxCost: 10,
    dependent: true,
    type: 'test',
    question: 'The puppy often damaged the narrator’s shoes and journals.',
    answers: ['a. TRUE', 'b. FALSE'],
    correctAnswer: 'b'
  });
  var subQuestion2 = new TestQuestion({
    header: 'Mark the statements below as TRUE or FALSE',
    maxCost: 10,
    dependent: true,
    type: 'test',
    question: 'Dogs weren’t generally allowed to come into the Observatory.',
    answers: ['a. TRUE', 'b. FALSE'],
    correctAnswer: 'a'
  });
  var subQuestion3 = new TestQuestion({
    header: 'Mark the statements below as TRUE or FALSE',
    maxCost: 10,
    dependent: true,
    type: 'test',
    question: 'The dog obeyed the narrator only.',
    answers: ['a. TRUE', 'b. FALSE'],
    correctAnswer: 'a'
  });
  var subQuestion4 = new TestQuestion({
    header: 'Choose the appropriate Russian equivalents for the following English phrases and sentences',
    maxCost: 10,
    dependent: true,
    type: 'test',
    question: 'I had no idea how much trouble a growing dog could cause.',
    answers: ['a. Я не представлял, что подрастающая собака доставляет одни хлопоты.', 'b. Я не представлял, сколько хлопот может доставить подрастающая собака.', 'c. Я не думал, что вырастить собаку доставит мне много хлопот.'],
    correctAnswer: 'b'
  });
  var subQuestion5 = new TestQuestion({
    header: 'Choose the appropriate Russian equivalents for the following English phrases and sentences',
    maxCost: 10,
    dependent: true,
    type: 'test',
    question: 'My cleaning and repair bills doubled.',
    answers: ['a. Мои счета за уборку и починку выросли вдвое.', 'b. На уборку и починку у меня теперь уходило вдвое больше времени.', 'c. Уборки и починки стало в два раза больше.'],
    correctAnswer: 'b'
  });
  subQuestion1.save();
  subQuestion2.save();
  subQuestion3.save();
  subQuestion4.save();
  subQuestion5.save();
  question.subQuestions.push(subQuestion1._id.toString());
  question.subQuestions.push(subQuestion2._id.toString());
  question.subQuestions.push(subQuestion3._id.toString());
  question.subQuestions.push(subQuestion4._id.toString());
  question.subQuestions.push(subQuestion5._id.toString());
  question.save();
}

function getQuestion(type) {
  AudioQuestion.find({dependent: false, type: type}).where('difficulty').gt(0).lt(20).exec(function (err, question) {
    console.log(question[0].header);
    question[0].subQuestions.forEach(function(id, subQuestions) {
      TestQuestion.findOne({_id: id}, function (err, subQuestion) {
        console.log(subQuestion.header);
        console.log(subQuestion.question);
        console.log(subQuestion.answers);
      });
    });
  });
}

module.exports = router;
