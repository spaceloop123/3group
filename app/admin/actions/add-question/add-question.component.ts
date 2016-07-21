import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";

@Component({
    selector: 'add-question-component',
    templateUrl: 'app/admin/actions/add-question/add-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class AddQuestionComponent implements OnInit {
    ngOnInit():any {
        return undefined;
    }

}