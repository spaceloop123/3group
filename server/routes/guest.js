var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');
var userService = require('../services/userService');

router.get('/allowTest', function (req, res) {
    userService.checkGuest(req.query.id, function (err, guest) {
        if (err || !guest) return res.status(404).end();

        req.login(guest, function (err) {
            if (err) return res.status(404).end();

            res.redirect('http://localhost:3000/#/runTest/user');
        });
    });
});

module.exports = router;