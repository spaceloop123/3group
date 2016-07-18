import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {TestsListData} from './tests-list.data';
import {CardsColorsData} from "./cards-colors.data";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'teacher-component',
    templateUrl: 'app/teacher/teacher-home.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [CardsColorsData, TestsListData]
})

export class TeacherComponent implements OnInit {

    //assignedTests - array of tests' descriptions, selectedTest - one test's description of the test being clicked
    private assignedTestsJson;
    private assignedTests;
    //private assignedTestsParced;
    public selectedTest;


    constructor(private cardsColorsData:CardsColorsData,
                private http:Http,
                private router:Router,
                //create testsListData as an instance of TestsListData to get assignedTests array
                private testsListData:TestsListData) {
    }

    private generateRandomColor = function () {
        //generates whole color name randomly
        this.randomColor = this.cardsColorsData.CARDS_COLORS_NEUTRAL[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_NEUTRAL.length)];
        return (this.randomColor);
    }

    getTests() {
        //getting array of test (without server now - just JSON.stringify & JSON.parse)
        this.assignedTestsJson = JSON.stringify(this.testsListData.ASSIGNED_TESTS);
        console.log(this.assignedTestsJson);

        this.assignedTests = JSON.parse(this.assignedTestsJson);
        for (let i = 0; i < this.assignedTests.length; i++) {
            this.assignedTests[i].color = this.generateRandomColor();
        }
        console.log(this.assignedTests);

        return(this.assignedTests);
        // this.http.get('', [that.assignedTestsJson])
        //     .toPromise()
        //     .then(response => that.assignedTests = response.json().data)
        //     .catch(this.handleError);
        // return this.assignedTests;
    }

    // handleError(error:any) {
    //     console.error('An error occurred', error);
    //     return Promise.reject(error.message || error);
    // }

    checkTest(test:TestsListData) {
        //this happens when teacher clicks CHECK button
        this.selectedTest = test;
        this.router.navigate(['/teacher/check_test', this.selectedTest.id]);
    }

    ngOnInit() {
        this.getTests();
    }
}