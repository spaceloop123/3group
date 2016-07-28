import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective, toast} from "angular2-materialize";
import {NgSwitchDefault, NgSwitch} from "@angular/common";
import {CustomHttp} from "../../../common/services/CustomHttp";
import {TestQuestionComponent} from "./question-type/test/test-question.component";
import {TestQuestion} from "./question-type/test/test-question.class";
import {InsertOpenQuestion} from "./question-type/insert-open/insert-open-question.class";
import {InsertOpenQuestionComponent} from "./question-type/insert-open/insert-open-question.component";
import {InsertTestQuestion} from "./question-type/insert-test/insert-test-question.class";
import {InsertTestQuestionComponent} from "./question-type/insert-test/insert-test-question.component";

@Component({
    selector: 'add-question-component',
    templateUrl: 'app/admin/actions/add-question/add-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, TestQuestionComponent, InsertOpenQuestionComponent,
        InsertTestQuestionComponent, NgSwitch, NgSwitchDefault]
})

export class AddQuestionComponent implements OnInit {
    private questionsList:any[];
    private selectedQuestion:any;
    private questionsCatalog:any[];

    ngOnInit():any {
        this.questionsList = [];
        this.questionsCatalog = [{type: new TestQuestion().type, checked: true},
            {type: new InsertOpenQuestion().type, checked: false},
            {type: new InsertTestQuestion().type, checked: false}];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    constructor(private customHttp:CustomHttp) {
        this.questionsList = [];
        this.questionsCatalog = [{type: new TestQuestion().type, checked: true},
            {type: new InsertOpenQuestion().type, checked: false},
            {type: new InsertTestQuestion().type, checked: false}];
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
            case 'TestQuestion':
            {
                this.questionsList.push(new TestQuestion());
                break;
            }
            case 'InsertOpenQuestion':
            {
                this.questionsList.push(new InsertOpenQuestion());
                break;
            }
            case 'InsertTestQuestion':
            {
                this.questionsList.push(new InsertTestQuestion());
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
            return toast('Nothing to add', 3000, 'yellow darken-2');
        }
        if (this.isEditModeOn()) {
            return toast('First, complete editing questions', 3000, 'amber darken-1');
        }

        console.log(JSON.stringify(this.questionsList));

        this.customHttp
            .post("/admin/add_questions", this.questionsList)
            .subscribe(
                res => {
                    toast('All questions were successfully added', 3000, 'green');
                    this.questionsList = [];
                },
                err => this.handleError(err)
            );
    }

    handleError(error) {
        toast('Failed to add questions', 3000, 'red darken-2');
    }

    onQuestionCreate(responce, idx):void {
        if (responce instanceof TestQuestion) {
            this.questionsList[idx] = responce;
            this.questionsList[idx].state = 'done';
        }
        else if (responce instanceof InsertOpenQuestion) {
            this.questionsList[idx] = responce;
            this.questionsList[idx].state = 'done';
        }
        else if (responce instanceof InsertTestQuestion) {
            this.questionsList[idx] = responce;
            this.questionsList[idx].state = 'done';
        }
        else {
            this.questionsList.splice(idx, 1);
        }
    }

    isEditModeOn() {
        let f:boolean = false;
        for (let i = 0; i < this.questionsList.length; ++i) {
            if (this.questionsList[i].state === 'edit') {
                f = true;
                break;
            }
        }
        return f;
    }

    onBtnClick() {
        for (let i = 0; i < this.questionsList.length; ++i) {
            console.log(this.questionsList[i].state)
        }
        console.log(this.isEditModeOn());
    }
}