import {onError} from "@angular/upgrade/src/util";
import {Component} from "@angular/core";

//import {BinaryClient} from 'binaryjs-client'

//var BinaryClient = require('binaryjs-client');

@Component({
    selector: 'speech-recorder',
    templateUrl: 'app/user/runTest/record-speech.html',
    directives: []
})

export class RecordSpeechComponent {

    socket:any;

    constructor(){
        //this.client = new BinaryClient('ws://localhost:3001');
        //this.client.on('open', function () {
            // for the sake of this example let's put the stream in the window
        //    this.stream = this.client.createStream();
        //});
        this.socket = new WebSocket('ws://localhost:3001');
        this.socket.binaryType = 'arraybuffer';
        //this.socket.onopen = this.sendData;
    }

    recordAudio(){
        let session = {
            audio: true,
            video: false
        };
        let recordRTC = null;
        let that = this;
        navigator.webkitGetUserMedia(session, ((s) => that.initializeRecorder(s)), onError);
    }

    //sendData(ctx){
    //    var data = ctx.getImageData(0, 0, 200, 200).data;
    //    var byteArray = new Uint8Array(data);
    //    this.socket.send(byteArray.buffer);
    //}


    initializeRecorder(stream) {
        let context = new AudioContext();
        let audioInput = context.createMediaStreamSource(stream);
        let bufferSize = 2048;
        // create a javascript node
        let recorder = context.createScriptProcessor(bufferSize, 1, 1);
        // specify the processing function
        let that = this;
        recorder.onaudioprocess = ((e) => that.recorderProcess(e));
        // connect stream to our recorder
        audioInput.connect(recorder);
        // connect our recorder to the previous destination
        recorder.connect(context.destination);
    }


    recorderProcess(e) {
        let left = e.inputBuffer.getChannelData(0);
        this.socket.send(this.convertFloat32ToInt16(left));
    }

    convertFloat32ToInt16(buffer) {
        let l = buffer.length;
        let buf = new Int16Array(l);
        while (l--) {
            buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
        }
        return buf.buffer;
    }
}