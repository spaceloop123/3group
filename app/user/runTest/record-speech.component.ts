import {onError} from "@angular/upgrade/src/util";
import {Component} from "@angular/core";

@Component({
    selector: 'speech-recorder',
    templateUrl: 'app/user/runTest/record-speech.html',
    directives: []
})

export class RecordSpeechComponent {

    socket:any;

    constructor() {
        this.socket = new WebSocket('ws://localhost:9160');
    }

    getUserMediaWrapper(session, successHandler, errorHandler) {
        (navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia ||
        navigator.msGetUserMedia).call(navigator, session, successHandler, errorHandler);
    }

    recordAudio() {
        let session = {
            audio: true,
            video: false
        };
        let recordRTC = null;
        let that = this;
        this.getUserMediaWrapper(session, ((s) => that.initializeRecorder(s)), onError);
    }

    initializeRecorder(stream) {
        let context = new AudioContext();
        let audioInput = context.createMediaStreamSource(stream);
        let bufferSize = 2048;
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
        console.log('recorderProcess');
        console.log(this.convertFloat32ToInt16(left));
        this.socket.send(this.convertFloat32ToInt16(left));
    }

    convertFloat32ToInt16(buffer) {
        let l = buffer.length;
        let buf = new Int16Array(l);
        while (l--) {
            buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
        }
        return buf;
    }
}