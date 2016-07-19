import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
    selector: 'user-component',
    templateUrl: 'app/user/user-home.html',
    directives: [ROUTER_DIRECTIVES, UserComponent],
})

export class UserComponent implements OnInit {
    testInfo;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.testInfo = {
            status: '',
            time: '',
            numQuestions: ''
        };

    }

    ngOnInit() {
        this.getTestInfo();
        if (this.testInfo.status === 'requestedTest') {
            this.testWaiter();
        }
    }

    getTestInfo() {
        var that = this;
        this.http.get('/user/testInfo')
            .toPromise()
            .then(response => that.testInfo.status = response.json().testStatus)
            .catch(that.handleError);
        console.log("testInfo.status-" + this.testInfo);
    }

    testWaiter() {
        while (this.testInfo.status !== 'availTest') {
            setTimeout(function () {
                this.getTestInfo();
            }, 3000);
        }
    }

    askTest() {
        alert('test is asked');
        var that = this;
        this.http.get('/user/askTest')
            .toPromise()
            .then(response => that.testInfo.status = 'requestedTest')
            .catch(this.handleError);
    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}






