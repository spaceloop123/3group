import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective, toast} from "angular2-materialize";
import {NgSwitch, NgSwitchDefault} from "@angular/common";
import {SpeechQuestion} from "./speech-question.class";

@Component({
    selector: 'speech-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/speech/speech-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, NgSwitch, NgSwitchDefault]
})

export class SpeechQuestionComponent implements OnInit {

    @Input() question:SpeechQuestion;
    @Output() notify:EventEmitter<any> = new EventEmitter<any>();

    ngOnInit():any {

    }

    constructor() {

    }

    onCreateFinish() {
        if (!this.isAllFilled(this.question)) {
            toast("Fill in the question form first", 5000, '' + 'amber darken-2');
            return;
        }
        this.question.state = 'done';
        this.notify.emit(this.question);
    }

    onEditStart() {
        this.question.state = 'edit';
    }

    onCreateAbort() {
        this.notify.emit(-1);
    }

    isAllFilled(question:any, ignoredProperties:string[] = []):boolean {
        question = question || {};
        return !Object.keys(question).some(key => {
            if (ignoredProperties.indexOf(key) === -1) {
                return !question[key] && typeof question[key] !== 'number' && ignoredProperties.indexOf(key) === -1;
            }
        });
    }
}