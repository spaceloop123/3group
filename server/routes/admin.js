var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
    res.status(200).send('Hello, admin!');
});

module.exports = router;