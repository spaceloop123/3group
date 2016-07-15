var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = express.Router();

router.post('/register', function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.role = req.body.role;
  user.email = req.body.email;

  user.save(function (err) {
    if(err) { return next(err); }

    return res.status(200).end();
  });
});

module.exports = router;