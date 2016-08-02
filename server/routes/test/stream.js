var express = require('express');
var router = express.Router();
var io = require('socket.io').listen(3001);
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs');

io.of('/a').on('connection', function (socket) {
    ss(socket).on('audio', function (stream, data) {
        var filename = path.basename(data.name);
        stream.pipe(fs.createReadStream(filename));
    });
});