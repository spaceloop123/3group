import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {Http} from "@angular/http";
import {CustomHttp} from "../common/services/CustomHttp";
import {RecordSpeechComponent} from "./runTest/record-speech.component";

@Component({
    selector: 'user-component',
    templateUrl: 'app/user/user-home.html',
    directives: [ROUTER_DIRECTIVES, UserComponent, RecordSpeechComponent]
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
        this.http.get('/user/test_info')
            .toPromise()
            .then(response => that.parseTestInfo(response.json()))
            .catch(that.handleError);
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
            }, 3000); // TODO: (pay attention) What happens here, why 3000 (move to constant if it's needed part of app)
        }
    }

    askTest() {
        // TODO: (pay attention) No! get rid of native alerts, use toster or smth like that
        var that = this;
        this.status = 'requestedTest'
        // TODO: (pay attention) Use CustomHttp + Observables
        this.http.get('/user/ask_test')
            .toPromise()
            .then(response => that.status = 'requested')
            .catch(this.handleError);
    }

    runTest() {
        console.log('runtest');
        this.router.navigate(['/runTest', 'user']);

    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}






