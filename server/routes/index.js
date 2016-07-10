var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var TestQuestion = mongoose.model('TestQuestion');

var mdlwares = require('../libs/mdlwares');

/* GET home page. */
router.get('/',  function(req, res, next) {
  res.render('index');
});

module.exports = router;
