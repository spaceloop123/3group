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
    private oldAnswersLength:number;

    ngOnInit():any {
        this.oldAnswersLength = this.testQuestion.answers.length;
    }

    constructor() {
        this.testQuestion = new TestQuestion();
        this.oldAnswersLength = this.testQuestion.answers.length;
    }

    resizeAnswers() {
        if (this.oldAnswersLength < 2 || this.oldAnswersLength > 5) {
            return;
        }
        let diff = this.oldAnswersLength - this.testQuestion.answers.length;
        if (this.oldAnswersLength > this.testQuestion.answers.length) {
            for (let i = 0; i < diff; ++i) {
                this.testQuestion.answers.push({content: ''});
            }
        } else if (this.oldAnswersLength < this.testQuestion.answers.length) {
            for (let i = 0; i < -diff; ++i) {
                this.testQuestion.answers.splice(this.testQuestion.answers.length - 1, 1);
            }
        }
        this.oldAnswersLength = this.testQuestion.answers.length;
    }

    changeCorrectAnswerIdx() {
        if (this.testQuestion.correctAnswerIdx < 1 || this.testQuestion.correctAnswerIdx > this.oldAnswersLength) {
            return;
        }
        this.testQuestion.correctAnswerIdx--;
        console.log(this.testQuestion.correctAnswerIdx);
    }

    onCreateFinish() {
        console.log(this.testQuestion);
    }
}