var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');

router.post('/login', function (req, res) {
    User.findOne({_id: req.body.id}, function (err, guest) {
        if (err) return res.status(500).end();
        if (!guest) return res.status(400).end();

        req.login(guest, function (err) {
            err ? res.status(400).end() : res.end();
        })
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.end();
});

module.exports = router;