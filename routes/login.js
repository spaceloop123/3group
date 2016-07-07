var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

router.post('/', function(req, res, next) {
    if(!req.body.login || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    User.findOne({username: req.body.login}, function (err, user) {
        if(user.validPassword(req.body.password)) {
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401);
        }
    });
});

module.exports = router;