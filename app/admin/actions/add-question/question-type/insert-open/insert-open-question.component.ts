import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {InsertOpenQuestion} from "./insert-open-question.class";

@Component({
    selector: 'insert-open-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/insert-open/insert-open-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class InsertOpenQuestionComponent implements OnInit {
    @Input() question:InsertOpenQuestion;
    @Output() notify:EventEmitter<any> = new EventEmitter<any>();

    ngOnInit():any {
        this.question.question = [{content: ''}, {content: ''}];
    }

    constructor() {
    }

    onCreateFinish() {
        this.question.state = 'done';
        this.notify.emit(this.question);
        // console.log(JSON.stringify(this.question));
    }

    onEditStart() {
        this.question.state = 'edit';
    }

    onCreateAbort() {
        this.notify.emit(-1);
    }
}