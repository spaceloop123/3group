import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {CardsColorsData} from "./cards-colors.data";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {CustomHttp} from "../common/services/CustomHttp";


@Component({
    selector: 'teacher-component',
    templateUrl: 'app/teacher/teacher-home.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [CardsColorsData, CustomHttp]
})

export class TeacherComponent implements OnInit {

    //assignedTests - array of tests' descriptions, selectedTest - one test's description of the test being clicked

    private assignedTests:any;

    constructor(private cardsColorsData:CardsColorsData,
                private customHttp: CustomHttp,
                private router:Router) {
    }

    private generateRandomColor = function () {
        //generates whole color name randomly
        this.randomColor = this.cardsColorsData.CARDS_COLORS_NEUTRAL[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_NEUTRAL.length)];
        return (this.randomColor);
    }

    getTests() {

        var that = this;
        this.customHttp.get('/teacher/tests')
            .subscribe(response => that.setTests(response));
             //.catch( that.handleError.bind(that));
    }

    setTests(response) {
        this.assignedTests = response;
        for (let i = 0; i < this.assignedTests.length; i++) {
            this.assignedTests[i].color = this.generateRandomColor();
            console.log('this.assignedTests[i] ' + typeof(this.assignedTests[i].color) + " " + this.assignedTests[i].color.length);
        }
    }

    checkTest(test) {
        //this happens when teacher clicks CHECK button
        this.router.navigate(['/teacher/check_test', test.id]);
    }


    handleError(error:any) {
        return Promise.reject(error.message || error);
    }

    ngOnInit() {
        this.customHttp.checkRole();
        this.getTests();
    }
}

/*
 for (let i = 0; i < this.assignedTests.length; i++) {
 this.assignedTests[i].color = this.generateRandomColor();
 }
 */