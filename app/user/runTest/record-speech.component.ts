import {onError} from "@angular/upgrade/src/util";


var BinaryClient = require('binaryjs-client');

export class RecordSpeechComponent {

    client : any;

    constructor(){
        this.client = new BinaryClient('ws://localhost:9001');
        this.client.on('open', function () {
            // for the sake of this example let's put the stream in the window
            window.Stream = this.client.createStream();
        });
    }

    recordAudio(){
        let session = {
            audio: true,
            video: false
        };
        let recordRTC = null;
        navigator.getUserMedia(session, this.initializeRecorder, onError);
    }


    initializeRecorder(stream) {
        let context = new AudioContext();
        let audioInput = context.createMediaStreamSource(stream);
        let bufferSize = 2048;
        // create a javascript node
        let recorder = context.createJavaScriptNode(bufferSize, 1, 1);
        // specify the processing function
        recorder.onaudioprocess = this.recorderProcess;
        // connect stream to our recorder
        audioInput.connect(recorder);
        // connect our recorder to the previous destination
        recorder.connect(context.destination);
    }


    recorderProcess(e) {
        let left = e.inputBuffer.getChannelData(0);
        window.Stream.write(this.convertFloat32ToInt16(left));
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