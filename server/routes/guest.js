var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');
var userService = require('../services/userService');

router.post('/login', function (req, res) {
    userService.checkGuest(req.body.id, function (err, guest) {
        if (err) return res.status(500).end();
        if (!guest) return res.status(403).end();

        req.login(guest, function (err) {
            err ? res.status(500).end() : res.end();
        });
    });
});

module.exports = router;