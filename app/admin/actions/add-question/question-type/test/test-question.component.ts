import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";

@Component({
    selector: 'test-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/test/test-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class TestQuestionComponent implements OnInit {

    // private testQuestion:TestQuestion;

    ngOnInit():any {

    }

    constructor() {
        //...
    }
}