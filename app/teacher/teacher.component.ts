import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {CardsColorsData} from "./cards-colors.data";
import "rxjs/add/operator/toPromise";
import {CustomHttp} from "../common/services/CustomHttp";
import {MaterializeDirective} from "angular2-materialize/dist/index";
import * as moment from 'moment/moment';

@Component({
    selector: 'teacher-component',
    templateUrl: 'app/teacher/teacher-home.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [CardsColorsData, CustomHttp]
})

export class TeacherComponent implements OnInit {

    //assignedTests - array of tests' descriptions, selectedTest - one test's description of the test being clicked

    private assignedTests:any;
    private momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

    constructor(private cardsColorsData:CardsColorsData,
                private customHttp: CustomHttp,
                private router: Router) {
    }

    private generateRandomColor = function () {
        //generates whole color name randomly
        this.randomColor = this.cardsColorsData.CARDS_COLORS_ACCENT[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_ACCENT.length)];
        return (this.randomColor);
    }

    getTests() {

        var that = this;
        this.customHttp.get('/teacher/tests')
            .subscribe(response => {
                that.setTests(response);
            });
             //.catch( that.handleError.bind(that));
    }

    setTests(response) {
        for (let i = 0; i < response.length; i++) {
            response[i].color = this.generateRandomColor();
            response[i].number = i + 1;
            response[i].date = this.momentConstructor().format('DD MMM YYYY');
        }
        this.assignedTests = response;
        console.log(this.assignedTests);
    }

    checkTest(test) {
        //this happens when teacher clicks CHECK button
        this.router.navigate(['/teacher/check_test', test.id]);
    }


    handleError(error:any) {
        return Promise.reject(error.message || error);
    }

    ngOnInit() {
        this.getTests();
    }
}

/*
 for (let i = 0; i < this.assignedTests.length; i++) {
 this.assignedTests[i].color = this.generateRandomColor();
 }
 */