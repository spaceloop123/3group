import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective, toast} from "angular2-materialize";
import {TestQuestion} from "./test-question.class";
import {NgSwitch, NgSwitchDefault} from "@angular/common";

@Component({
    selector: 'test-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/test/test-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, NgSwitch, NgSwitchDefault]
})

export class TestQuestionComponent implements OnInit {

    private oldAnswersLength:number;

    @Input() question:TestQuestion;
    @Output() notify:EventEmitter<any> = new EventEmitter<any>();

    ngOnInit():any {
        this.oldAnswersLength = this.question.answers.length;
    }

    constructor() {
        
    }

    resizeAnswers() {
        if (this.oldAnswersLength < 2 || this.oldAnswersLength > 5) {
            return;
        }
        let diff = this.oldAnswersLength - this.question.answers.length;
        if (this.oldAnswersLength > this.question.answers.length) {
            for (let i = 0; i < diff; ++i) {
                this.question.answers.push({content: ''});
            }
        } else if (this.oldAnswersLength < this.question.answers.length) {
            for (let i = 0; i < -diff; ++i) {
                this.question.answers.splice(this.question.answers.length - 1, 1);
            }
        }
        this.oldAnswersLength = this.question.answers.length;
    }

    changeCorrectAnswerIdx() {
        if (this.question.correctAnswerIdx < 1 || this.question.correctAnswerIdx > this.oldAnswersLength) {
            return;
        }
        this.question.correctAnswerIdx--;
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

    isAllFilled (question) {

    }
}