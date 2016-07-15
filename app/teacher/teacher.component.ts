import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {TestsListData} from './tests-list.data';
import {CardsColorsData} from "./cards-colors.data";
import {Http} from "@angular/http";
import {TeacherCheckingComponent} from './teacher-checking.component';

@Component({
    selector: 'teacher-component',
    templateUrl: 'app/teacher/teacher-home.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [CardsColorsData, TestsListData],
    precompile: [TeacherCheckingComponent]
})

export class TeacherComponent implements OnInit {
    private assignedTests;
    public selectedTest;

    constructor(private cardsColorsData:CardsColorsData,
                private http:Http,
                private router:Router,
                private testsListData:TestsListData) {
    }

    private generateRandomColor = function () {
        //generates whole color name randomly
        this.randomColorLeft = this.cardsColorsData.CARDS_COLORS_LEFT[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_LEFT.length)];
        this.randomColorRight = this.cardsColorsData.CARDS_COLORS_RIGHT[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_RIGHT.length)];
        return (this.randomColorLeft + " " + this.randomColorRight);
    }

    getTests() {
        this.assignedTests = this.testsListData.ASSIGNED_TESTS;
        for (let i = 0; i < this.assignedTests.length; i++) {
            this.assignedTests[i].color = this.generateRandomColor();
        }
        return (this.assignedTests);
        //var that = this;
        // this.http.get()
        //     .toPromise()
        //     .then(response => that.assignedTests = response.json().data)
        //     .catch(this.handleError);
    }

    checkTest(test:TestsListData) {
        this.selectedTest = test;
        this.router.navigate(['/teacher/check_test', this.selectedTest.name]);
    }

    ngOnInit() {
        this.getTests();
        console.log(this.assignedTests);
    }
}