import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {MaterializeDirective} from 'angular2-materialize'
import {TestInfo} from "./test.info";
import {TimerComponent} from "./timer.component";
import {TestComponent} from "./test.component";

@Component({
    templateUrl: 'app/user/runTest/runTest.html',
    directives: [REACTIVE_FORM_DIRECTIVES, MaterializeDirective, ROUTER_DIRECTIVES, TimerComponent, TestComponent]
})

export class RunTestComponent implements OnInit, OnDestroy {
    sub:any;
    role:any;
    testInfo:TestInfo;
    timerSec: number;
    progress: number;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.timerSec = 605;
        this.progress = 80;
    }

    restoreTestInfo(){
        return JSON.parse(localStorage.getItem('testInfo'));
    }

    ngOnInit() {
        //TODO add customHttp.checkRole()
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.role = params['role'];
            console.log('that.status ' + that.role);
        });
        this.testInfo = this.restoreTestInfo();
        if(this.testInfo === null) {
            this.getTestInfoFromServer();
        }
        console.log(this.testInfo);
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

    onResponse(response) {
        this.initTestInfo(response.json().time, response.json().count, response.json().testId);
        //this.getNextQuestionFromServer();
    }

    initTestInfo(time, numQuestion, id) {
        this.testInfo = new TestInfo(time, numQuestion, id);
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
       /* this.http
            .post('/end_test',
                JSON.stringify({testId: that.testInfo.id}), {headers: header})
            .toPromise()
            .then(response => that.router.navigate(['/finishTest', that.role]))
            .catch();*/
        that.router.navigate(['/finishTest', that.role]);

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