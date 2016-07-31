import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {MaterializeDirective} from 'angular2-materialize'
import {TestInfo} from "../../test/test.info";
import {TimerComponent} from "./timer.component";
import {TestComponent} from "../../test/test.component";
import {CustomHttp} from "../../common/services/CustomHttp";

@Component({
    templateUrl: 'app/user/runTest/runTest.html',
    directives: [REACTIVE_FORM_DIRECTIVES, MaterializeDirective, ROUTER_DIRECTIVES, TimerComponent, TestComponent],
    providers: [CustomHttp]
})

export class RunTestComponent implements OnInit, OnDestroy {
    sub:any;
    role:any;
    testInfo:TestInfo;
    timerSec: number;
    progress: number;
    opMode: string;
    answersId: any;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http,
                private customHttp: CustomHttp) {
        this.timerSec = 456;
        this.progress = 80;
        this.opMode = 'user';
        this.answersId = {};
    }

    restoreTestInfo(){
        return JSON.parse(localStorage.getItem('testInfo'));
    }

    ngOnInit() {
        this.customHttp.checkRole();
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.role = params['role'];
            console.log('that.status ' + that.role);
        });
        this.testInfo = this.restoreTestInfo();
        console.log(this.testInfo);
        console.log('blabla');
        if(this.testInfo === null) {
            this.getTestInfoFromServer();
        }
        //console.log(this.testInfo);
    }

    getTestInfoFromServer(){
        var that = this;
        this.http.get('/user/init_test')
            .toPromise()
            .then(response => that.onResponse(response))
            .catch(this.handleError);
    }

    saveTestInfo(){
        localStorage.setItem('testInfo', JSON.stringify(this.testInfo));
    }

    onResponse(response) {
        console.log(response.json().deadline + ' ' + response.json().count  + ' ' +  response.json().testId);
        this.initTestInfo(response.json().deadline, response.json().count, response.json().testId);

        //this.getNextQuestionFromServer();
    }

    initTestInfo(deadline, numQuestion, id) {
        this.testInfo = new TestInfo(deadline, numQuestion, id);
        this.saveTestInfo();
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
        let that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post('/user/end_test',
                JSON.stringify({testId: that.testInfo.id}), {headers: header})
            .toPromise()
            .then(response => that.router.navigate(['/finishPage', that.role]))
            .catch();

    }

    afterSent(tc : TestComponent){
        if(!tc.goForward()){
            this.finishTest();
        }
    }
    
    sendAndGo(tc :TestComponent){
        let that = this;
        tc.sendAnswer(() => that.afterSent(tc));
    }

    setProgress(newValue: number){
        this.progress = newValue;
    }
}