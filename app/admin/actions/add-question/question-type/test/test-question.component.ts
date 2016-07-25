import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {TestQuestion} from "./test-question.class";

@Component({
    selector: 'test-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/test/test-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class TestQuestionComponent implements OnInit {

    private testQuestion:TestQuestion;
    private answers:any;
    private answersLength:number;
    private correctAnswerIdx:number;

    ngOnInit():any {
        this.answers = [{content: ''}, {content: ''}, {content: ''}];
        this.answersLength = this.answers.length;
        this.correctAnswerIdx = 0;
    }

    constructor() {
        this.testQuestion = new TestQuestion();
        this.answers = [{content: ''}, {content: ''}, {content: ''}];
        this.answersLength = this.answers.length;
        this.correctAnswerIdx = 0;
    }

    resizeAnswers() {
        if (this.answersLength < 2 || this.answersLength > 5) {
            return;
        }
        let diff = this.answersLength - this.answers.length;
        if (this.answersLength > this.answers.length) {
            for (let i = 0; i < diff; ++i) {
                this.answers.push({content: ''});
            }
        } else if (this.answersLength < this.answers.length) {
            for (let i = 0; i < -diff; ++i) {
                this.answers.splice(this.answers.length - 1, 1);
            }
        }
        this.answersLength = this.answers.length;
    }

    changeCorrectAnswerIdx() {
        if (this.testQuestion.correctAnswerIdx < 1 || this.testQuestion.correctAnswerIdx > this.answersLength) {
            return;
        }
        this.testQuestion.correctAnswerIdx--;
        console.log(this.testQuestion.correctAnswerIdx);
    }

    onCreateFinish() {
        this.testQuestion.answers = this.answers;
        console.log(this.testQuestion);
    }
}