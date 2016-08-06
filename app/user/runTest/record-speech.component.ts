import {onError} from "@angular/upgrade/src/util";
import {Component} from "@angular/core";

@Component({
    selector: 'speech-recorder',
    templateUrl: 'app/user/runTest/record-speech.html',
    directives: []
})

export class RecordSpeechComponent {

    socket:any;
    stream:any;
    recorder:any;

    getUserMediaWrapper(session, successHandler, errorHandler) {
        (navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia ||
        navigator.msGetUserMedia).call(navigator, session, successHandler, errorHandler);
    }

    recordAudio() {
        this.socket = new WebSocket('ws://localhost:2016');
        let session = {
            audio: true,
            video: false
        };
        let that = this;
        this.socket.onopen = function (event) {
            that.socket.send("Some data for Maxim\n");
        };
        //please, add supporte for reading metadata on serverside

        this.getUserMediaWrapper(session, ((s) => that.initializeRecorder(s)), onError);
    }

    initializeRecorder(stream) {
        this.stream = stream;
        let context = new AudioContext();
        let audioInput = context.createMediaStreamSource(stream);
        let bufferSize = 2048;
        this.recorder = context.createScriptProcessor(bufferSize, 5, 2);
        // specify the processing function
        let that = this;
        this.recorder.onaudioprocess = ((e) => that.recorderProcess(e));
        // connect stream to our recorder
        audioInput.connect(this.recorder);
        // connect our recorder to the previous destination
        this.recorder.connect(context.destination);
    }


    recorderProcess(e) {
        let left = e.inputBuffer.getChannelData(0);
        //console.log('recorderProcess');
        console.log('a');
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

    closeAudio() {
        if (this.recorder !== undefined) {
            this.recorder.disconnect();
            this.recorder = undefined;
        }
        if (this.stream !== undefined) {
            this.stream.getAudioTracks().forEach((track) => track.stop());
            this.stream = undefined;
        }
        if (this.socket !== undefined) {
            this.socket.close();
            this.socket = undefined;
        }
    }
}