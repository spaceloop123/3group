var express = require('express');
var router = express.Router();
var mdlwares = require('../libs/mdlwares');

router.use(mdlwares.isTeacher);

router.get('/test', function(req, res, next) {
    res.status(200).send('Hello, teacher!');
});

module.exports = router;