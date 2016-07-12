var express = require('express');
var router = express.Router();
var mdlwares = require('../libs/mdlwares');

router.use(mdlwares.isAdmin);

router.get('/test', function(req, res, next) {
    res.status(200).send('Hello, admin!');
});

module.exports = router;