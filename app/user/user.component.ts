import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {Http} from "@angular/http";
import {CustomHttp} from "../common/services/CustomHttp";
import {RecordSpeechComponent} from "./runTest/record-speech.component";
import {PlayAudioComponent} from "./runTest/play-audio.component";
import {MaterializeDirective, toast} from "angular2-materialize";
import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";

@Component({
    selector: 'user-component',
    templateUrl: 'app/user/user-home.html',
    directives: [ROUTER_DIRECTIVES, UserComponent, RecordSpeechComponent, PlayAudioComponent,
        MaterializeDirective, REACTIVE_FORM_DIRECTIVES]
})

export class UserComponent implements OnInit {
    status:string;
    time:string;
    numQuestions:string;

    constructor(private router:Router,
                private http:Http,
                private customHttp: CustomHttp) {
        this.status = '';
        this.time = '';
        this.numQuestions = '';


    }

    ngOnInit() {
        this.getTestInfo();
        if (this.status === 'requested') {
            this.testWaiter();
        }
    }

    getTestInfo() {
        var that = this;
        //TODO (pay attention) Use CustomHttp + Observables
        /*this.http.get('/user/test_info')
            .toPromise()
            .then(response => that.parseTestInfo(response.json()))
         .catch(that.handleError);*/
        this.customHttp.get('/user/test_info')
            .subscribe(response => {
                that.parseTestInfo(response);
            });
    }


    parseTestInfo(response) {
        this.status = response.status
        if (this.status === 'available') {
            this.time = response.time;
            this.numQuestions = response.count;
        }

    }

    testWaiter() {
        while (this.status !== 'available') {
            setTimeout(function () {
                this.getTestInfo();
            }, 1000);
        }
    }

    askTest() {
        var that = this;
        this.status = 'requestedTest'
        // TODO: (pay attention) Use CustomHttp + Observables
        /*this.http.get('/user/ask_test')
            .toPromise()
            .then(response => that.status = 'requested')
         .catch(this.handleError);*/
        this.customHttp.get('/user/ask_test')
            .subscribe(response => {
                that.status = 'requested'
            });
    }

    runTest() {
        console.log('runtest');
        let flag = (localStorage.getItem('testInfo') ? 1 : -1);
        console.log(flag);
        console.log(this.status);
        console.log('blabla');
        if (this.status === 'run' && flag === 1) {
            this.router.navigate(['/runTest', 'user']);
        } else if (this.status === 'available' && flag === -1) {
            this.router.navigate(['/runTest', 'user']);
        } else {
            toast('Sorry, you did something wrong', 5000, 'orange');
        }

    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}






