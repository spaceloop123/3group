import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
    selector: 'user-component',
    templateUrl: 'app/user/user-home.html',
    directives: [ROUTER_DIRECTIVES],
    })

export class UserComponent implements OnInit{
    testStatus;
    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.testStatus = 'requestedTest';
        console.log(this.testStatus);
    }

    ngOnInit() {
        //this.getTestStatus ();



    }

    getTestStatus() {
        var that = this;
        this.http.get('/testStatus')
            .toPromise()
            .then(response => that.testStatus = response.json().testStatus)
            .catch(this.handleError);
    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}