var WebSocketServer = new require('ws');
var wav = require('wav');
var fs = require('fs');

var spies = {};

var webSocketServer = new WebSocketServer.Server({
    port: 3001
});
webSocketServer.on('connection', function (ws) {
    var wavStream;
    var id = Math.random();

    ws.on('message', function (message) {
        if(message === 'spy') {
            spies[id] = ws;
        } else if(wavStream === undefined) {
            wavStream = new wav.FileWriter(__dirname + '/server/assets/' + message, {
                channels: 1,
                sampleRate: 48000,
                bitDepth: 16
            })
        } else {
            wavStream.write(message);
            for(var key in spies) {
                spies[key].send(message);
            }
        }
    });

    ws.on('open', function (message) {
        console.log('open');
    });

    ws.on('close', function () {
        wavStream.end(null);
        delete spies[id];
    });
});

module.exports = webSocketServer;