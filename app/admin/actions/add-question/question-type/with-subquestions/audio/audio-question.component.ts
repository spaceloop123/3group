import {OnInit, Component, Input, EventEmitter, Output} from "@angular/core";
import {MaterializeDirective, toast} from "angular2-materialize/dist/index";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {NgSwitch, NgSwitchDefault} from "@angular/common";
import {AudioQuestion} from "./audio-question.class";
import {InsertTestQuestion} from "../../insert-test/insert-test-question.class";
import {InsertOpenQuestion} from "../../insert-open/insert-open-question.class";
import {TestQuestion} from "../../test/test-question.class";
import {TestQuestionComponent} from "../../test/test-question.component";
import {InsertTestQuestionComponent} from "../../insert-test/insert-test-question.component";
import {InsertOpenQuestionComponent} from "../../insert-open/insert-open-question.component";
import {UploadFileComponent} from "./upload-file.component";

@Component({
    selector: 'audio-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/with-subquestions/audio/audio-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, TestQuestionComponent, InsertTestQuestionComponent,
        InsertOpenQuestionComponent, NgSwitch, NgSwitchDefault, UploadFileComponent]
})

export class AudioQuestionComponent implements OnInit {

    private oldSubQuestionsLength:number;
    private selectedQuestion:any;
    private questionsCatalog:any[];

    @Input() question:AudioQuestion;
    @Output() notify:EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        this.question = new AudioQuestion();
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
            }];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    ngOnInit():any {
        this.oldSubQuestionsLength = this.question.subQuestions.length;
        this.question.path = this.question.id + Date.now();
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
            }];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    toastError() {
        toast('Complete editing question before adding sub-question', 5000, 'amber darken-2');
    }

    isAllFieldsFilledIn() {
        if(this.question.state === 'edit' && !this.question.difficulty) {
            return false;
        } else {
            return true;
        }
    }

    addSubQuestion() {
        if (this.question.state !== 'edit') {
            return;
        }

        switch (this.selectedQuestion) {
            case 'TestQuestion':
            {
                this.question.subQuestions.push(new TestQuestion(this.question.difficulty, true));
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
        if (!this.isAllFieldsFilledIn()) {
            return toast('First, complete editing Audio Question', 5000, 'amber darken-1');
        }
        this.question.state = 'done';
        this.question.action = (e) => this.streamFile(e);
        this.notify.emit(this.question);
        console.log(this.question.state);
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

    streamFile(uploadAudio:UploadFileComponent) {
        uploadAudio.streamFileToServer();
    }

    onEditStart() {
        this.question.state = 'edit';
    }

    onCreateAbort() {
        this.notify.emit(-1);
    }

    isAllFilled(question:any, ignoredProperties:string[] = []):boolean {
        question = question || {};
        return !Object.keys(question).some(key => {
            if (ignoredProperties.indexOf(key) === -1) {
                return !question[key] && typeof question[key] !== 'number' && ignoredProperties.indexOf(key) === -1;
            }
        });
    }
}