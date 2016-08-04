var WebSocketServer = new require('ws');
var wav = require('wav');
var fs = require('fs');

var webSocketServer = new WebSocketServer.Server({
    port: 3001
});
webSocketServer.on('connection', function (ws) {
    var fileName = 'test.wav';
    var wavStream = new wav.FileWriter(fileName, {
        channels: 1,
        sampleRate: 48000,
        bitDepth: 16
    });

    wavStream.on('error', function(err) {
        console.log(err);
    });

    ws.on('message', function (message) {
        wavStream.write(message);
    });

    ws.on('close', function () {
        wavStream.end(null);
    });
});

module.exports = webSocketServer;