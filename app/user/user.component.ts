import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";
import {CustomHttp} from "../common/services/CustomHttp";

@Component({
    selector: 'user-component',
    templateUrl: 'app/user/user-home.html',
    directives: [ROUTER_DIRECTIVES, UserComponent],
    providers: [CustomHttp]
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
        this.customHttp.checkRole();
        this.getTestInfo();
        if (this.status === 'requested') {
            this.testWaiter();
        }
    }

    getTestInfo() {
        var that = this;
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
            }, 3000);
        }
    }

    askTest() {
        alert('test is asked');
        var that = this;
        this.http.get('/user/ask_test')
            .toPromise()
            .then(response => that.status = 'requestedTest')
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






