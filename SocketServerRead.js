var WebSocketServer = new require('ws');
var wav = require('wav');
var fs = require('fs');

var webSocketServer = new WebSocketServer.Server({
    port: 3002
});
webSocketServer.on('connection', function (ws) {
    var file = fs.createReadStream('test.wav');
    ws.pipe(file);

    ws.on('close', function () {

    });
});

module.exports = webSocketServer;