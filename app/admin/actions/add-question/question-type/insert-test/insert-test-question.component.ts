import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {NgSwitchDefault, NgSwitch} from "@angular/common";
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {InsertTestQuestion} from "./insert-test-question.class";

@Component({
    selector: 'insert-test-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/insert-test/insert-test-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, NgSwitch, NgSwitchDefault]
})

export class InsertTestQuestionComponent implements OnInit {

    private oldAnswersLength:number;

    @Input() question:InsertTestQuestion;
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
    }

    onCreateFinish() {
        if (!this.isAllFilled(this.question)) {
            toast("Fill in the question form first", 5000, '' + 'amber darken-2');
            return;
        }
        this.question.state = 'done';
        console.log(this.question);
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