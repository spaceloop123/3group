import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {MaterializeDirective, toast} from "angular2-materialize/dist/index";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {InsertOpenQuestion} from "./insert-open-question.class";

@Component({
    selector: 'insert-open-question-component',
    templateUrl: 'app/admin/actions/add-question/question-type/insert-open/insert-open-question.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class InsertOpenQuestionComponent implements OnInit {
    @Input() question:InsertOpenQuestion;
    @Output() notify:EventEmitter<any> = new EventEmitter<any>();

    ngOnInit():any {
        this.question.question = [{content: ''}, {content: ''}];
    }

    constructor() {
    }

    onCreateFinish() {
        if (!this.isAllFilled(this.question, [])) {
            toast("Fill in the question form first", 5000, '' + 'amber darken-2');
            return;
        }
        this.question.state = 'done';
        this.notify.emit(this.question);
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
            if(ignoredProperties.indexOf(key) === -1) {
                if(!question[key] &&  ['number', 'boolean'].indexOf( typeof question[key] ) === -1) {
                    console.log('Key '+ key+' = '+question[key]+' is not passed for '+ question);
                    return true;
                }
            }
        });
    }
}