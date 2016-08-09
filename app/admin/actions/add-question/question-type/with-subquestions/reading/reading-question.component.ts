import {OnInit, Component, Input, EventEmitter, Output} from "@angular/core";
import {MaterializeDirective, toast} from "angular2-materialize/dist/index";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {NgSwitch, NgSwitchDefault} from "@angular/common";
import {ReadingQuestion} from "./reading-question.class";
import {OpenQuestion} from "../../open/open-question.class";
import {InsertTestQuestion} from "../../insert-test/insert-test-question.class";
import {InsertOpenQuestion} from "../../insert-open/insert-open-question.class";
import {TestQuestion} from "../../test/test-question.class";
import {TestQuestionComponent} from "../../test/test-question.component";
import {InsertTestQuestionComponent} from "../../insert-test/insert-test-question.component";
import {InsertOpenQuestionComponent} from "../../insert-open/insert-open-question.component";
import {OpenQuestionComponent} from "../../open/open-question.component";

@Component({
    selector: 'reading-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/with-subquestions/reading/reading-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, TestQuestionComponent, InsertTestQuestionComponent,
        InsertOpenQuestionComponent, OpenQuestionComponent, NgSwitch, NgSwitchDefault]
})

export class ReadingQuestionComponent implements OnInit {

    private oldSubQuestionsLength:number;
    private selectedQuestion:any;
    private questionsCatalog:any[];

    @Input() question:ReadingQuestion;
    @Output() notify:EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        this.question = new ReadingQuestion();
        this.oldSubQuestionsLength = this.question.subQuestions.length;

        this.questionsCatalog = [
            {
                type: new TestQuestion(null, false).type,
                title: 'Test Question',
                image: 'app/admin/actions/add-question/education-icons/test.png',
                description: 'Common task with one right variant to choose'
            },
            {
                type: new InsertOpenQuestion(null, false).type,
                title: 'Gap-filling',
                image: 'app/admin/actions/add-question/education-icons/fountain-pen.png',
                description: 'Empty inputs to insert right answers where needed'
            },
            {
                type: new InsertTestQuestion(null, false).type,
                title: 'One of many',
                image: 'app/admin/actions/add-question/education-icons/paste.png',
                description: 'Dropdown menu in sentence with options to insert'
            },
            {
                type: new OpenQuestion(null, false).type,
                title: 'Open question',
                image: 'app/admin/actions/add-question/education-icons/keyboard.png',
                description: 'Task to show your opinion and write a little paragraph on subject'
            }];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    ngOnInit():any {
        this.oldSubQuestionsLength = this.question.subQuestions.length;

        this.questionsCatalog = [
            {
                type: new TestQuestion(null, false).type,
                title: 'Test Question',
                image: 'app/admin/actions/add-question/education-icons/test.png',
                description: 'Common task with one right variant to choose'
            },
            {
                type: new InsertOpenQuestion(null, false).type,
                title: 'Gap-filling',
                image: 'app/admin/actions/add-question/education-icons/fountain-pen.png',
                description: 'Empty inputs to insert right answers where needed'
            },
            {
                type: new InsertTestQuestion(null, false).type,
                title: 'One of many',
                image: 'app/admin/actions/add-question/education-icons/paste.png',
                description: 'Dropdown menu in sentence with options to insert'
            },
            {
                type: new OpenQuestion(null, false).type,
                title: 'Open question',
                image: 'app/admin/actions/add-question/education-icons/keyboard.png',
                description: 'Task to show your opinion and write a little paragraph on subject'
            }];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    toastError() {
            toast('Complete editing question before adding sub-question', 3000, 'amber darken-2');
    }

    isAllFieldsFilledIn() {
        if(this.question.state === 'edit' && !this.question.difficulty) {
            return false;
        } else {
            return true;
        }
    }

    addSubQuestion() {
        switch (this.selectedQuestion) {
            case 'TestQuestion':
            {
                this.question.subQuestions.push(new TestQuestion(this.question.difficulty, true));
                console.log('JKDFKDS = ' + JSON.stringify(this.question.subQuestions[0]));
                break;
            }
            case 'InsertOpenQuestion':
            {
                this.question.subQuestions.push(new InsertOpenQuestion(this.question.difficulty, true));
                break;
            }
            case 'InsertTestQuestion':
            {
                this.question.subQuestions.push(new InsertTestQuestion(this.question.difficulty, true));
                break;
            }
            case 'OpenQuestion':
            {
                this.question.subQuestions.push(new OpenQuestion(this.question.difficulty, true));
                break;
            }
            default:
            {
                console.log('Failed to add new question');
                break;
            }
        }
    }

    onQuestionCreate(responce, idx):void {
        if (responce instanceof TestQuestion) {
            this.question.subQuestions[idx] = responce;
            this.question.subQuestions[idx].state = 'done';
        }
        else if (responce instanceof InsertOpenQuestion) {
            this.question.subQuestions[idx] = responce;
            this.question.subQuestions[idx].state = 'done';
        }
        else if (responce instanceof InsertTestQuestion) {
            this.question.subQuestions[idx] = responce;
            this.question.subQuestions[idx].state = 'done';
        }
        else if (responce instanceof OpenQuestion) {
            this.question.subQuestions[idx] = responce;
            this.question.subQuestions[idx].state = 'done';
        }
        else {
            this.question.subQuestions.splice(idx, 1);
        }
    }

    changeState(idx) {
        this.selectedQuestion = this.questionsCatalog[idx].type;
        console.log(this.selectedQuestion);
        this.addSubQuestion();
    }

    onCreateFinish() {
        if (this.isSubQuestionStillEdit()) {
            return toast('First, complete editing Reading Question', 3000, 'amber darken-1');
        }
        this.question.state = 'done';
        this.notify.emit(this.question);
    }

    isSubQuestionStillEdit() {
        let f:boolean = false;
        for (let i = 0; i < this.question.subQuestions.length; ++i) {
            if (this.question.subQuestions[i].state === 'edit') {
                f = true;
                break;
            }
        }
        return f;
    }

    onEditStart() {
        this.question.state = 'edit';
    }

    onCreateAbort() {
        this.notify.emit(-1);
    }

}