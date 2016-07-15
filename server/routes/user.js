var express = require('express');
var router = express.Router();
var mdlwares = require('../libs/mdlwares');

router.use(mdlwares.isUser);

router.get('/test', function(req, res, next) {
    res.status(200).send('Hello, user!');
});

router.get('/testinfo', function (req, res, next) {
   res.send({testStatus: 'availTest'});
});

module.exports = router;