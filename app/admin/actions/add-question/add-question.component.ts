import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {NgSwitchDefault, NgSwitch} from "@angular/common";
import {TestQuestionComponent} from "./question-type/test/test-question.component";
import {OpenInsertQuestionComponent} from "./question-type/open-insert/open-insert-question.component";

@Component({
    selector: 'add-question-component',
    templateUrl: 'app/admin/actions/add-question/add-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, TestQuestionComponent, OpenInsertQuestionComponent,
        NgSwitch, NgSwitchDefault]
})

export class AddQuestionComponent implements OnInit {
    private questionsList:any[];
    private selectedQuestion:any;
    private questionsCatalog:any[];

    ngOnInit():any {
        this.questionsList = [];
        this.questionsCatalog = [{type: 'test', checked: true, color: 'red darken-1', name: 'Test Question'},
            {type: 'open-insert', checked: false, color: 'purple darken-1', name: 'Open-Insert Question'}];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    constructor() {
        this.questionsList = [];
        this.questionsCatalog = [{type: 'test', checked: true, color: 'red darken-1', name: 'Test Question'},
            {type: 'open-insert', checked: false, color: 'purple darken-1', name: 'Open-Insert Question'}];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    changeState(idx) {
        for (let i = 0; i < this.questionsCatalog.length; ++i) {
            this.questionsCatalog[i].checked = false;
        }
        this.questionsCatalog[idx].checked = true;
        this.selectedQuestion = this.questionsCatalog[idx].type;
    }

    addNewQuestion() {
        this.questionsList.push(this.selectedQuestion);
    }
}