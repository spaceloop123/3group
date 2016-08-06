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

    play() {
        console.log('trying to play "bla-bla.data"');
        this.initAudio();
        let that = this;
        this.socket = new WebSocket('ws://localhost:2016');
        this.socket.binaryType = "arraybuffer";
        this.socket.onmessage = ((message) => that.processSample(message));
    }

    initAudio() {
        let context = new AudioContext();
        this.source = context.createBufferSource();
        this.audioBuffer = context.createBuffer(1, 150000, context.sampleRate);
        this.source.buffer = this.audioBuffer;
        this.source.connect(context.destination);
        this.currentPosition = 0;
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