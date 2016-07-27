import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {NgSwitchDefault, NgSwitch} from "@angular/common";
import {TestQuestionComponent} from "./question-type/test/test-question.component";
import {OpenInsertQuestionComponent} from "./question-type/open-insert/open-insert-question.component";
import {TestQuestion} from "./question-type/test/test-question.class";
import {OpenInsertQuestion} from "./question-type/open-insert/open-insert-question.class";
import {Headers, Http} from "@angular/http";

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
        this.questionsCatalog = [{type: new TestQuestion().type, checked: true},
            {type: new OpenInsertQuestion().type, checked: false}];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    constructor(private http:Http) {
        this.questionsList = [];
        this.questionsCatalog = [{type: new TestQuestion().type, checked: true},
            {type: new OpenInsertQuestion().type, checked: false}];
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
        switch (this.selectedQuestion) {
            case 'test':
            {
                this.questionsList.push(new TestQuestion());
                break;
            }
            case 'open-insert':
            {
                this.questionsList.push(new OpenInsertQuestion());
                break;
            }
            default:
            {
                console.log('Failed to add new question');
                break;
            }
        }
    }

    sendAllQuestions() {
        if (this.questionsList.length === 0) {
            return;
        }
        console.log(JSON.stringify(this.questionsList));

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http
            .post("/add_questions", JSON.stringify(this.questionsList), {headers: headers})
            .toPromise()
            .then(response => console.log(response.json()));
    }

    onQuestionCreate(responce, idx):void {
        if (responce instanceof TestQuestion) {
            this.questionsList[idx] = responce;
        } else {
            this.questionsList.splice(idx, 1);
        }
    }
}