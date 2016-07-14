import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
    selector: 'user-component',
    templateUrl: 'app/user/user-home.html',
    directives: [ROUTER_DIRECTIVES],
})

export class UserComponent implements OnInit {
    testInfo;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.testInfo = {
            status: 'availTest',
            time: '20 min',
            numQuestions: '50'
        };
        console.log(this.testInfo.status);
    }

    ngOnInit() {
        //this.getTestInfo ();


    }

    getTestInfo() {
        var that = this;
        this.http.get('/testInfo')
            .toPromise()
            .then(response => that.testInfo = response.json().testInfo)
            .catch(this.handleError);
    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}

/*
 getHeroes() {
 this.heroService.getHeroes()
 .then(
 heroes => this.heroes = heroes,
 error =>  this.errorMessage = <any>error);
 }
 addHero (name: string) {
 if (!name) { return; }
 this.heroService.addHero(name)
 .then(
 hero  => this.heroes.push(hero),
 error =>  this.errorMessage = <any>error);
 }

    */