var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

module.exports.login = function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function (err, user, info) {
        if (user) {
            req.login(user, function (err) {
                if (err) {
                    return res.status(401).json(err);
                } else {
                    return res.json({role: user.role});
                }
            });
        } else {
            return res.status(401).json(err);
        }
    })(req, res, next);
};

module.exports.logout = function (req, res, next) {
    req.logout(user, function (err) {
        if (err) {
            return res.status(401).json(err);
        } else {
            return res.json({status: "deleted"});
        }
    });
};