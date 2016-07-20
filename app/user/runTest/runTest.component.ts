import {Component, OnDestroy, OnInit, ElementRef} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {AuthService} from '../../common/auth/auth.service';
import {MaterializeDirective} from 'angular2-materialize'
import {TestInfo} from "./test.info";
import {toPromise} from "rxjs/operator/toPromise";

@Component({
    templateUrl: 'app/user/runTest/runTest.html',
    directives: [REACTIVE_FORM_DIRECTIVES, MaterializeDirective, ROUTER_DIRECTIVES],
    providers: [AuthService]
})

export class RunTestComponent implements OnInit, OnDestroy {
    subQ: boolean;
    question:any;
    subQuestions: any[];
    myAudio:any;

    sub:any;
    role:any;
    index: number;
    controlNames:string[];
    isPlayed:boolean;
    playCount:number;
    openAnswer:string;
    testInfo:TestInfo;
    r:any;
    id:string;
    options:any[];
    counter:number;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private auth: AuthService,
                private http:Http) {
        /* this.question = {
         type: 'test',
         header: "Add a  model for the list of checked recipients. ",
         question: 'Type the search and replacement text explicitly, or specify patterns using regular expression, or select a previously used piece of text or a pattern from the recent history drop-down list. ',
         options: [{name: 'aaa', checked: true},
         {name: 'bbb', checked: true},
         {name: 'ccc', checked: false},
         {name: 'ddd', checked: false},
         {name: 'eee', checked: true},],
         answer: 'buka'
         //options: ["Hello1", "Hello2", "Hello3"]
         };*/
        this.subQuestions = new Array();
        this.index = 0;
        this.subQ = false;
        this.options = new Array();
        this.controlNames = ["aaa", "bbb", "ccc"];
        this.isPlayed = false;
        this.openAnswer = "bukaOpen";
        /*this.id = '';
         localStorage.setItem(name, 'Vasia');
         console.log(localStorage.getItem(name));*/
        this.question = {type: "nothing"};
        this.counter = 1;

    }

    changeCheckState(idx) {
        console.log(idx);
        console.log(this.options[idx].checked);
        this.options[idx].checked = !this.options[idx].checked;
    }

    ngOnInit() {
        this.auth.checkAuth();
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.role = params['role'];
            console.log('that.status ' + that.role);
        });
        this.http.get('/' + this.role + '/initTest')
            .toPromise()
            .then(response => that.onResponse(response))
            .catch(this.handleError);

    }

    nextQuestion() {
        console.log('data ' + this.testInfo.numQuestions + '  ' + this.counter);
        if(this.index >= this.subQuestions.length){
          
            this.subQ = false;
            this.index = 0;
            this.subQuestions = [];
            //this.question.type = 'nothing';
        }
        if (this.counter >= 7 && !this.subQ) {
            this.finishTest();
        } else if(!this.subQ){
            this.testInfo = localStorage.getItem("testInfo");
            //this.testInfo.num = this.testInfo.num + 1;
            ++this.counter;
            this.getNextQuestion();
        } else if(this.index < this.subQuestions.length){

            this.question = this.subQuestions[this.index];
            console.log("this.question " + this.subQuestions);
            ++this.index;
            if(this.question.type === 'TestQuestion'){
                this.makeOptions();
            }

        } else{
            
        }
    }

    getNextQuestion() {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post('/' + this.role + '/next_question',
                JSON.stringify({n: that.counter, testId: that.testInfo.id}), {headers: header})
            .toPromise()
            .then(response => that.print(response.json()))
            .catch(that.handleError);


    }

    makeOptions(){

            this.options = [];
            for (let index = 0; index < this.question.answers.length; ++index) {
                console.log('answer' + this.question.answers[index]);
                this.options.push({name: this.question.answers[index], checked: false});
            }

    }


    print(response) {
        localStorage.setItem('testInfo', JSON.stringify(this.testInfo));
        this.question = response;
        if(this.question.type === 'TestQuestion') {
            this.makeOptions();
        }
    }


    onResponse(response) {
        this.parse(response.json().time, response.json().count, response.json().testId);
        this.getNextQuestion();
    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    parse(time, numQuestion, id) {
        this.testInfo = new TestInfo(time, numQuestion, id, this.counter);
        localStorage.setItem('testInfo', JSON.stringify(this.testInfo));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    finishTest() {
       
        this.router.navigate(['/finishTest', this.role]);
    }

    printSubquestions(){
        this.subQ = true;
        this.index = 0;
        this.subQuestions = this.question.subQuestions;
        console.log('subQuestions ' + this.subQuestions);
        this.nextQuestion();
    }

    playAydio() {

        if (!this.isPlayed) {
            this.myAudio = new Audio();
            this.myAudio.src = "http://vignette4.wikia.nocookie.net/starwars/images/f/f5/A_little_short.ogg/revision/latest?cb=20090519125603";
            this.myAudio.load();
            //audio.play();
            this.isPlayed = true;
            this.playCount = 0;
            //audio.addEventListener("ended")
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
