import {Component} from "@angular/core";

@Component({
    selector: 'play-audio',
    templateUrl: 'app/user/runTest/play-audio.html',
    directives: []
})

export class PlayAudioComponent {
    socket:any;
    source:any;
    audioBuffer:any;
    currentPosition:number;
    first:boolean;

    play() {
        console.log('trying to play "bla-bla.data"');
        this.initCommunication();
        let that = this;
        this.socket = new WebSocket('ws://localhost:3002');
        this.socket.binaryType = "arraybuffer";

        this.socket.onmessage = ((message) => that.processSample(message));
    }

    initCommunication() {
        this.first = true;

    }

    initAudio(fileSize:number) {
        let context = new AudioContext();
        this.source = context.createBufferSource();
        this.audioBuffer = context.createBuffer(1, fileSize, context.sampleRate);//filesize in samples
        this.source.buffer = this.audioBuffer;
        this.source.connect(context.destination);
        this.currentPosition = 0;
    }

    onMessage(message) {
        if (this.first) {
            message.data// need a number / sampleRate
            this.initAudio(150000);
        }
        else {
            this.processSample(message);
        }
    }

    processSample(message) {
        //console.log(message);
        let sample = new Float32Array(message.data);
        //console.log(sample);
        console.log(sample.length);
        let newPosition = this.currentPosition + sample.length;
        console.log(this.audioBuffer.getChannelData(0).length);
        if (newPosition > this.audioBuffer.getChannelData(0).length) {
            console.log("Early");
            this.activatePlay();
            return;
        }
        this.audioBuffer.getChannelData(0).set(sample, this.currentPosition);
        this.currentPosition = newPosition;
        if (this.currentPosition === this.audioBuffer.getChannelData(0).length) {
            this.activatePlay();
        }
        //this.audioBuffer.getChannelData(0).set(sample);
        //this.source.start(0);
    }
    
    activatePlay() {
        console.log("Activated");
        this.doPlay();
    }

    doPlay() {
        this.source.start(0);
    }
}