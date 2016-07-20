import {Component, OnDestroy, OnInit, ElementRef} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {MaterializeDirective} from 'angular2-materialize'
import {TestInfo} from "./test.info";

@Component({
    templateUrl: 'app/user/runTest/runTest.html',
    directives: [REACTIVE_FORM_DIRECTIVES, MaterializeDirective, ROUTER_DIRECTIVES]
})

export class RunTestComponent implements OnInit, OnDestroy {
    question:any;
    subQuestions: any[];
    myAudio:any;
    sub:any;
    role:any;
    controlNames:string[];
    isPlayed:boolean;
    playCount:number;
    openAnswer:string;
    testInfo:TestInfo;
    options:any[];
    answer: string[];
    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.subQuestions = [];

        this.subQuestions = new Array();
        this.options = new Array();
        this.controlNames = ["aaa", "bbb", "ccc"];
        this.isPlayed = false;
        /*this.id = '';
         localStorage.setItem(name, 'Vasia');
         console.log(localStorage.getItem(name));*/
        this.question = {type: "nothing"};
        this.answer = [''];

    }



    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.role = params['role'];
            console.log('that.status ' + that.role);
        });
        this.testInfo = this.getTestInfo();
        console.log(this.testInfo);
        if(this.testInfo === null) {
            this.initTest();
        } else {
            this.getQuestion();
        }

    }

    initTest(){
        var that = this;
        this.http.get('/' + this.role + '/init_test')
            .toPromise()
            .then(response => that.onResponse(response))
            .catch(this.handleError);
    }

    saveTestInfo(){
        localStorage.setItem('testInfo', JSON.stringify(this.testInfo));
    }

    getTestInfo(){
        return JSON.parse(localStorage.getItem('testInfo'));
    }

    saveQuestion(){
        localStorage.setItem('question', JSON.stringify(this.question));
        localStorage.setItem('subQuestions', JSON.stringify(this.subQuestions));
    }

    getQuestion(){
        this.question = JSON.parse(localStorage.getItem('question'));
        this.subQuestions = JSON.parse(localStorage.getItem('subQuestions'));
        console.log( this.subQuestions);
    }

    onResponse(response) {
        this.parseTestInfo(response.json().time, response.json().count, response.json().testId);
        this.getNextQuestion();
    }

    parseTestInfo(time, numQuestion, id) {
        this.testInfo = new TestInfo(time, numQuestion, id, 1);
        this.saveTestInfo();
    }

    getNextQuestion() {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.testInfo = this.getTestInfo();
        console.log(' testInfo ' + this.testInfo.num );
        this.http
            .post('/' + this.role + '/next_question',
                JSON.stringify({n: that.testInfo.num, testId: that.testInfo.id}), {headers: header})
            .toPromise()
            .then(response => that.updateQuestion(response.json()))
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

    sendAnswer(){

        console.log(' this.openAnswer ' + this.question.answer)
        this.createAnswer();
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.testInfo = this.getTestInfo();
        console.log(' testInfo ' + this.testInfo.num );
        this.http
            .post('/' + this.role + '/answer',
                JSON.stringify({test: that.testInfo.id, question: that.question.id, answer: that.answer}), {headers: header})
            .toPromise()
            .then(response => console.log(response))
            .catch(that.handleError);
    }

    updateQuestion(response) {
        this.question = response;
        this.saveQuestion();
        this.processQuestion();
    }

    processQuestion(){
        if(this.question.type === 'TestQuestion'){
            this.makeOptions();
        }
    }

    changeCheckState(idx) {
        console.log(idx);
        console.log(this.options[idx].checked);
        this.options[idx].checked = !this.options[idx].checked;
    }

    nextQuestion() {

        this.sendAnswer();
        this.testInfo = this.getTestInfo();
        this.getQuestion();

        if(this.question.index >= this.subQuestions.length){
            this.question.index = 0;
            this.subQuestions = [];
        }

        if (this.testInfo.num >= (this.testInfo.numQuestions - 1) && !this.subQuestions.length) {
            this.finishTest();
        } else if(!this.subQuestions.length){
            ++this.testInfo.num;
            this.saveTestInfo();
            this.getNextQuestion();
        } else if(this.question.index < this.subQuestions.length){
            var i = this.question.index;
            this.question = this.subQuestions[this.question.index];
            this.processQuestion();
            this.question.index = (i + 1);
            this.saveQuestion();
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

    printSubquestions(){

        if(this.question.type === 'AudioQuestion'){
            this.myAudio.pause();
        }

        this.question.index = 0;
        this.subQuestions = this.question.subQuestions;

        this.saveQuestion();
        this.nextQuestion();
    }

    playAydio() {
        if (!this.isPlayed) {
            this.myAudio = new Audio();
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
