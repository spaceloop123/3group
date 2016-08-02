import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {CardsColorsData} from "./cards-colors.data";
import "rxjs/add/operator/toPromise";
import {CustomHttp} from "../common/services/CustomHttp";
import {MaterializeDirective} from "angular2-materialize/dist/index";

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

    getTests() {

        var that = this;
        this.customHttp.get('/teacher/tests')
            .subscribe(response => {
                that.setTests(response.json());
            });
    }

    setTests(response) {
        let i = 0;
        let j = 0;
        for (; i < response.length; i++, j++) {

            //setting cards color
            if (j >= this.cardsColorsData.CARDS_COLORS_ACCENT.length) {
                j = 0;
            }
            response[i].color = this.cardsColorsData.CARDS_COLORS_ACCENT[j];

            //---------------

            response[i].number = i + 1;
        }
        this.assignedTests = response;
        console.log(this.assignedTests);
    }

    checkTest(test) {
        //this happens when teacher clicks CHECK button
        this.router.navigate(['/teacher/check_test', test.id]);
    }

    ngOnInit() {
        this.customHttp.checkRole();
        this.getTests();
    }
}