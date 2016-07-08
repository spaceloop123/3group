var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
//var TestQuestion = mongoose.model('TestQuestion');

var mdlwares = require('../libs/mdlwares');

/* GET home page. */
router.get('/',  function(req, res, next) {
  // var question = new TestQuestion();
  // question.difficulty = 1;
  // question.maxCost = 10;
  // question.question = 'Test';
  // question.answers = ['First', 'Second', 'Third'];
  // question.correctAnswer = 'First';
  //
  // question.save();

  // console.log('1');
  // var user = new User({
  //   username: 'blabla',
  //   email: 'username@gmail.com'
  // });
  // user.setPassword('password');
  // user.save();
  // User.find({ username: 'john'}, function (err, user) {
  //   var user1  = user[user.length - 1];
  //   console.log(user1);
  //   user1.username = 'John';
  //   console.log(user1);
  //   user1.save();
  res.render('index');
});

module.exports = router;
