import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective, toast} from "angular2-materialize";
import {NgSwitchDefault, NgSwitch} from "@angular/common";
import {TestQuestionComponent} from "./question-type/test/test-question.component";
import {OpenInsertQuestionComponent} from "./question-type/open-insert/open-insert-question.component";
import {TestQuestion} from "./question-type/test/test-question.class";
import {OpenInsertQuestion} from "./question-type/open-insert/open-insert-question.class";
import {CustomHttp} from "../../../common/services/CustomHttp";

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

    constructor(private customHttp:CustomHttp) {
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
            case 'TestQuestion':
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
            return toast('Nothing to add', 3000, 'yellow darken-2');
        }
        if (this.isEditModeOn()) {
            return toast('First, complete to edit some questions', 3000, 'amber darken-1');
        }
        console.log("questionList to JSON : ");
        console.log(JSON.stringify(this.questionsList));
        console.log("---------");

        this.customHttp
            .post("/admin/add_questions", JSON.stringify(this.questionsList))
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
        } else {
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
}