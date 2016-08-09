import {Component, OnInit, style, state, transition, animate, trigger, keyframes} from "@angular/core";
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
import {OpenQuestion} from "./question-type/open/open-question.class";
import {OpenQuestionComponent} from "./question-type/open/open-question.component";
import {SpeechQuestion} from "./question-type/speech/speech-question.class";
import {SpeechQuestionComponent} from "./question-type/speech/speech-question.component";
import {ReadingQuestion} from "./question-type/with-subquestions/reading/reading-question.class";
import {ReadingQuestionComponent} from "./question-type/with-subquestions/reading/reading-question.component";
import {AudioQuestion} from "./question-type/with-subquestions/audio/audio-question.class";
import {AudioQuestionComponent} from "./question-type/with-subquestions/audio/audio-question.component";

@Component({
    selector: 'add-question-component',
    templateUrl: 'app/admin/actions/add-question/add-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, TestQuestionComponent, InsertOpenQuestionComponent,
        InsertTestQuestionComponent, OpenQuestionComponent, SpeechQuestionComponent, ReadingQuestionComponent,
        AudioQuestionComponent, NgSwitch, NgSwitchDefault],
    animations: [
        trigger('animateAddQuestionBtn', [
            state('visible', style({display: 'visible', transform: 'translateY(0)'})),
            state('invisible', style({display: 'none', transform: 'translateY(-2000px)'})),
            transition('visible => invisible', animate('200ms linear', keyframes([
                style({display: 'visible', transform: 'translateY(0)', offset: 0}),
                style({display: 'none', transform: 'translateY(-22px)', offset: 1.0})
            ]))),
            transition('invisible => visible', animate('200ms linear', keyframes([
                style({display: 'none', transform: 'translateY(-22px)', offset: 0}),
                style({display: 'visible', transform: 'translateY(0)', offset: 1.0})
            ])))
        ])
    ]
})

export class AddQuestionComponent implements OnInit {
    private questionsList:any[];
    private selectedQuestion:any;
    private questionsCatalog:any[];

    ngOnInit():any {
        this.questionsList = [];
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
                type: new ReadingQuestion().type,
                title: 'Reading',
                image: 'app/admin/actions/add-question/education-icons/open-book.png',
                description: 'A little story to check text understanding and reading skills'
            },
            {
                type: new OpenQuestion(null, false).type,
                title: 'Open question',
                image: 'app/admin/actions/add-question/education-icons/keyboard.png',
                description: 'Task to show your opinion and write a little paragraph on subject'
            },
            {
                type: new SpeechQuestion(null, false).type,
                title: 'Speech',
                image: 'app/admin/actions/add-question/education-icons/microphone.png',
                description: 'Recording an answer on topic for showing pronunciation skills'
            },
            {
                type: new InsertTestQuestion(null, false).type,
                title: 'One of many',
                image: 'app/admin/actions/add-question/education-icons/paste.png',
                description: 'Dropdown menu in sentence with options to insert'
            },
            {
                type: new AudioQuestion().type,
                title: 'Listening',
                image: 'app/admin/actions/add-question/education-icons/violin.png',
                description: 'Playing audio sample to check listening skills'
            }];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    constructor(private customHttp:CustomHttp) {
        this.questionsList = [];
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
                type: new ReadingQuestion().type,
                title: 'Reading',
                image: 'app/admin/actions/add-question/education-icons/open-book.png',
                description: 'A little story to check text understanding and reading skills'
            },
            {
                type: new OpenQuestion(null, false).type,
                title: 'Open question',
                image: 'app/admin/actions/add-question/education-icons/keyboard.png',
                description: 'Task to show your opinion and write a little paragraph on subject'
            },
            {
                type: new SpeechQuestion(null, false).type,
                title: 'Speech',
                image: 'app/admin/actions/add-question/education-icons/microphone.png',
                description: 'Recording an answer on topic for showing pronunciation skills'
            },
            {
                type: new InsertTestQuestion(null, false).type,
                title: 'One of many',
                image: 'app/admin/actions/add-question/education-icons/paste.png',
                description: 'Dropdown menu in sentence with options to insert'
            },
            {
                type: new AudioQuestion().type,
                title: 'Listening',
                image: 'app/admin/actions/add-question/education-icons/violin.png',
                description: 'Playing audio sample to check listening skills'
            }];
        this.selectedQuestion = this.questionsCatalog[0].type;
    }

    changeState(idx) {
        this.selectedQuestion = this.questionsCatalog[idx].type;
        console.log(this.selectedQuestion);
        this.addNewQuestion();
    }

    addNewQuestion() {
        switch (this.selectedQuestion) {
            case 'TestQuestion':
            {
                this.questionsList.push(new TestQuestion(null, false));
                break;
            }
            case 'InsertOpenQuestion':
            {
                this.questionsList.push(new InsertOpenQuestion(null, false));
                break;
            }
            case 'InsertTestQuestion':
            {
                this.questionsList.push(new InsertTestQuestion(null, false));
                break;
            }
            case 'OpenQuestion':
            {
                this.questionsList.push(new OpenQuestion(null, false));
                break;
            }
            case 'SpeechQuestion':
            {
                this.questionsList.push(new SpeechQuestion(null, false));
                break;
            }
            case 'ReadingQuestion':
            {
                this.questionsList.push(new ReadingQuestion());
                break;
            }
            case 'AudioQuestion':
            {
                this.questionsList.push(new AudioQuestion());
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
            return toast('Complete editing questions', 3000, 'amber darken-1');
        }
        let questionState = this.isEmptyQuestionWithSubQuestionsExists();
        if (questionState !== 'none') {
            if (questionState === 'empty') {
                return toast('First, add some sub-questions', 3000, 'amber darken-1');
            } else if (questionState === 'sub') {
                return toast('Complete editing sub-question(s)', 3000, 'amber darken-1');
            }
        }

        console.log('-------------');
        console.log('Try to send Questions List = ');
        console.log(JSON.stringify(this.questionsList));
        console.log('-------------');

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
        else if (responce instanceof OpenQuestion) {
            this.questionsList[idx] = responce;
            this.questionsList[idx].state = 'done';
        }
        else if (responce instanceof SpeechQuestion) {
            this.questionsList[idx] = responce;
            this.questionsList[idx].state = 'done';
        }
        else if (responce instanceof ReadingQuestion) {
            this.questionsList[idx] = responce;
            this.questionsList[idx].state = 'done';
        }
        else if (responce instanceof AudioQuestion) {
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

    isEmptyQuestionWithSubQuestionsExists():string {
        for (let i = 0; i < this.questionsList.length; ++i) {
            if ((this.questionsList[i].type === 'ReadingQuestion') || (this.questionsList[i].type === 'AudioQuestion')) {
                if (!this.questionsList[i].subQuestions.length) {
                    return 'empty';
                }
                for (let j = 0; j < this.questionsList[i].subQuestions.length; ++j) {
                    if (this.questionsList[i].subQuestions[j].state === 'edit') {
                        return 'sub';
                    }
                }
            }
        }
        return 'none';
    }
}