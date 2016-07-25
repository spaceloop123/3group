import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {TestQuestionComponent} from "./question-type/test/test-question.component";

@Component({
    selector: 'add-question-component',
    templateUrl: 'app/admin/actions/add-question/add-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, TestQuestionComponent]
})

export class AddQuestionComponent implements OnInit {
    private questionsList;

    ngOnInit():any {
        this.questionsList = [];
    }

    constructor() {
        this.questionsList = [];
    }
}