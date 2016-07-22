import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {MaterializeDirective} from 'angular2-materialize'
import {TestInfo} from "./test.info";
import {TimerComponent} from "./timer.component";
import {QuestionInfo} from "./question.info";
import {SubQuestionsInfo} from "./subQuestions.info";

@Component({
    templateUrl: 'app/user/runTest/runTest.html',
    directives: [REACTIVE_FORM_DIRECTIVES, MaterializeDirective, ROUTER_DIRECTIVES, TimerComponent]
})

export class RunTestComponent implements OnInit, OnDestroy {
    question:any;
    myAudio:any;
    sub:any;
    role:any;
    controlNames:string[];
    isPlayed:boolean;
    playCount:number;
    openAnswer:string;

    testInfo:TestInfo;
    questionInfo: QuestionInfo;
    subQuestionsInfo: SubQuestionsInfo;

    options:any[];
    answer: string[];
    timerSec: number;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.options = new Array();

        this.isPlayed = false;
        this.question = {type: "nothing"};
        this.answer = [''];
        this.timerSec = 7000;
        this.questionInfo = new QuestionInfo(false, '');
        this.subQuestionsInfo = null;
    }



    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.role = params['role'];
            console.log('that.status ' + that.role);
        });
        this.testInfo = this.restoreTestInfo();
        console.log(this.testInfo);
        if(this.testInfo === null) {
            this.getTestInfoFromServer();
        } else {
            this.questionInfo = this.restoreQuestionInfo();
            //this.subQuestionsInfo = this.restoreSubQuestionInfo();
            if(!this.questionInfo.sent){
                this.getNextQuestionFromServerById(this.questionInfo.id);
            }else{
                this.getNextQuestionFromServer();
            }
        }
    }

    getTestInfoFromServer(){
        var that = this;
        this.http.get('/' + this.role + '/init_test')
            .toPromise()
            .then(response => that.onResponse(response))
            .catch(this.handleError);
    }

    saveTestInfo(){
        localStorage.setItem('testInfo', JSON.stringify(this.testInfo));
    }

    restoreTestInfo(){
        return JSON.parse(localStorage.getItem('testInfo'));
    }

    saveQuestionInfo(){
        localStorage.setItem('questionInfo', JSON.stringify(this.questionInfo));
    }

    restoreQuestionInfo() {
        return JSON.parse(localStorage.getItem('questionInfo'));
    }

    saveSubQuestionInfo(){
        localStorage.setItem('subQuestionInfo', JSON.stringify(this.subQuestionsInfo));
    }

    restoreSubQuestionInfo() {
        return JSON.parse(localStorage.getItem('subQuestionInfo'));
    }

    onResponse(response) {
        this.initTestInfo(response.json().time, response.json().count, response.json().testId);
        this.getNextQuestionFromServer();
    }

    initTestInfo(time, numQuestion, id) {
        this.testInfo = new TestInfo(time, numQuestion, id, 1);
        this.saveTestInfo();
    }

    getNextQuestionFromServer() {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.testInfo = this.restoreTestInfo();
        console.log(' testInfo ' + this.testInfo.num);
        this.http
            .post('/' + this.role + '/next_question',
                JSON.stringify({n: that.testInfo.num, testId: that.testInfo.id}), {headers: header})
            .toPromise()
            .then(response => that.saveQuestionFromResponse(response.json()))
            .catch(that.handleError);


    }

    getNextQuestionFromServerById(id: string) {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.testInfo = this.restoreTestInfo();
        console.log(' testInfo ' + id + ' ' + this.testInfo.id);
        this.http
            .post('/' + this.role + '/next_question_by_id',
                JSON.stringify({id: id, testId: that.testInfo.id}), {headers: header})
            .toPromise()
            .then(response => that.saveQuestionFromResponse(response.json()))
            .catch(that.handleError);


    }

    createAnswer(){
        this.answer = new Array();
        if(this.question.type === 'TestQuestion') {
            for(let index = 0; index < this.options.length; ++index){
                if(this.options[index].checked){
                    this.answer.push(this.options[index].name);
                }
            }

        } else{
            this.answer = new Array(this.question.answer);
        }
    }

    sendAnswerToServer(){
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post('/' + this.role + '/answer',
                JSON.stringify({test: that.testInfo.id, question: that.question.id, answer: that.answer}), {headers: header})
            .toPromise()
            .then(response => console.log(response))
            .catch(that.handleError);


    }

    sendAnswer(){

        this.createAnswer();
        this.testInfo = this.restoreTestInfo();
        this.questionInfo.sent = true;
        this.restoreQuestionInfo();
        this.sendAnswerToServer();
    }

    saveQuestionFromResponse(response) {
        this.question = response;
        var buffer = this.restoreSubQuestionInfo();
        if(buffer){
            this.subQuestionsInfo = buffer;
        } else if(this.question.subQuestions) {
            console.log(this.question.subQuestions);
            this.subQuestionsInfo = new SubQuestionsInfo(this.question.subQuestions, 0);
            this.saveSubQuestionInfo();

        }
        this.questionInfo = new QuestionInfo(false, this.question.id);
        this.saveQuestionInfo();
        console.log(this.subQuestionsInfo);

        this.processQuestion();
    }

    processQuestion(){
        if(this.question.type === 'TestQuestion'){
            this.makeOptions();
        }else if(this.question.type === 'AudioQuestion'){
            this.myAudio = new Audio();
        }
    }

    changeCheckState(idx) {
        console.log(idx);
        console.log(this.options[idx].checked);
        this.options[idx].checked = !this.options[idx].checked;
    }

    goToNextQuestion() {
        if((this.question.type !== 'AudioQuestion') && (this.question.type !== 'ReadingQuestion')) {
            this.sendAnswer();

        }else{
            this.subQuestionsInfo.index = 0;
        }

        if(this.subQuestionsInfo) {
            if(this.subQuestionsInfo.index < this.subQuestionsInfo.subQuestionsId.length){
                console.log(this.subQuestionsInfo.subQuestionsId[this.subQuestionsInfo.index]);
                this.getNextQuestionFromServerById(this.subQuestionsInfo.subQuestionsId[this.subQuestionsInfo.index]);
                console.log('index ' + this.subQuestionsInfo.index);
                ++this.subQuestionsInfo.index;
                if(this.subQuestionsInfo.index === this.subQuestionsInfo.subQuestionsId.length){
                    this.subQuestionsInfo = null;
                }
                this.saveSubQuestionInfo();
            }else {
                if(this.testInfo.num > (this.testInfo.numQuestions )){
                    this.finishTest();
                }
                ++this.testInfo.num;
                this.saveTestInfo();
                this.subQuestionsInfo = null;
                this.getNextQuestionFromServer();


            }
        } else {
            if(this.testInfo.num >= (this.testInfo.numQuestions )){
                this.finishTest();
            }else{
                ++this.testInfo.num;
                this.saveTestInfo();
                this.getNextQuestionFromServer();
            }

        }
    }



    makeOptions(){
        this.options = [];
        for (let index = 0; index < this.question.answers.length; ++index) {
            console.log('answer' + this.question.answers[index]);
            this.options.push({name: this.question.answers[index], checked: false});
        }

    }

    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    finishTest() {
        localStorage.clear();
        this.router.navigate(['/finishTest', this.role]);
    }



    playAydio() {
        if (!this.isPlayed) {
            this.myAudio.src = "http://vignette4.wikia.nocookie.net/starwars/images/f/f5/A_little_short.ogg/revision/latest?cb=20090519125603";
            this.myAudio.load();
            this.isPlayed = true;
            this.playCount = 0;
        }

        if (this.playCount < 2 && this.myAudio.paused) {
            this.myAudio.play();
            var that = this;
            this.myAudio.addEventListener("ended", () => that.playCount += 1);
        }

        if (this.playCount >= 2) {
            console.log('Your have spent all of the attempts!');
        }
    }
}