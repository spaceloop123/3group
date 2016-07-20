import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {AuthService} from '../common/auth/auth.service';
import {Http} from "@angular/http";

@Component({
    selector: 'user-component',
    templateUrl: 'app/user/user-home.html',
    directives: [ROUTER_DIRECTIVES, UserComponent],
    providers: [AuthService]
})

export class UserComponent implements OnInit {
    testInfo;

    constructor(
                private router:Router,
                private http:Http,
                private auth: AuthService) {
        this.testInfo = {
            status: '',
            time: '20 min',
            numQuestions: '50'
        };

    }

    ngOnInit() {
        this.auth.checkAuth();
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

    runTest(){
        console.log('runtest');
        this.router.navigate(['/runTest', 'user']);

    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}






