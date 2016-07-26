import {Component, OnInit} from "@angular/core";
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {OpenInsertQuestion} from "./open-insert-question.class";

@Component({
    selector: 'open-insert-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/open-insert/open-insert-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class OpenInsertQuestionComponent implements OnInit {
    private question:OpenInsertQuestion;

    ngOnInit():any {
        this.question.answers = [{content: ''}, {content: ''}, {content: ''}];
    }

    constructor() {
        this.question = new OpenInsertQuestion();
    }
}