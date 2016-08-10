import {OnDestroy, OnInit, Component, Input, Output, EventEmitter, SimpleChanges, OnChanges} from "@angular/core";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'upload-file',
    templateUrl: 'app/admin/actions/add-question/question-type/with-subquestions/audio/upload-file.html',
    directives: []
})

export class UploadFileComponent implements OnChanges, OnDestroy {
    @Input() id:any;
    array:any[];

    ngOnChanges(changes:SimpleChanges):any {
        if (changes['id']) {
            this.id = changes['id'].currentValue;
        }
    }

    onFileChangeListener(event) {
        let reader = new FileReader();
        let that = this;
        reader.onload = ((e) => that.onFileLoaded(e));
        console.log(event);
        reader.readAsArrayBuffer(event.target.files[0]);
    }

    onFileLoaded(buffer:ArrayBuffer) {
        this.array = new Int8Array(buffer.target.result);
        //console.log(array);
        //streamFileToServer(array);
    }

    streamFileToServer() {
        let socket = new WebSocket('ws://localhost:2016');
        let that = this;
        socket.onopen = function (event) {
            socket.send(that.id + '.wav');
            socket.send(that.array);
            socket.close();
        };
    }

    ngOnDestroy() {

    }

}


