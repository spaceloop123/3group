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
    testInfo;

    constructor(
                private router:Router,
                private http:Http,
                private customHttp: CustomHttp) {
        this.testInfo = {
            status: '',
            time: '500 min',
            numQuestions: '50'
        };

    }

    ngOnInit() {
        this.customHttp.checkRole();
        this.getTestInfo();
        if (this.testInfo.status === 'requested') {
            this.testWaiter();
        }
    }

    getTestInfo() {
        var that = this;
        this.http.get('/user/test_info')
            .toPromise()
            .then(response => that.testInfo.status = response.json().status)
            .catch(that.handleError);
    }
    
    testWaiter() {
        while (this.testInfo.status !== 'availtest') {
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






