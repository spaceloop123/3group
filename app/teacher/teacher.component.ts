import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {CardsColorsData} from "./cards-colors.data";
import {CustomHttp} from "../common/services/CustomHttp";
import {MaterializeDirective, toast} from "angular2-materialize";

@Component({
    selector: 'teacher-component',
    templateUrl: 'app/teacher/teacher-home.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [CardsColorsData] // TODO: (pay attention) see comment in main.js
})

export class TeacherComponent implements OnInit {

    //assignedTests - array of tests' descriptions, selectedTest - one test's description of the test being clicked

    private assignedTests:any;
    currentTestId:any;
    defaultClass:string = '';
    activeClass:string = 'active';

    constructor(private customHttp:CustomHttp,
                private router:Router) {


    }

    ngOnInit() {

        let testId = JSON.parse(localStorage.getItem('subQuestionInfo'));
        if (testId) {
            this.currentTestId = testId.testId;
            this.defaultClass = 'disabled';
        } else {
            this.currentTestId = null;
            this.defaultClass = '';
        }
        this.getTests();
    }

    getTests() {

        var that = this;
        this.customHttp.get('/teacher/tests')
            .subscribe(response => {
                that.setTests(response);
            });
    }

    setTests(response) {
        let i = 0;
        let j = 0;
        while (i < response.length) {

            if (j >= CardsColorsData.CARDS_COLORS_ACCENT.length) {
                j = 0;
            }
            response[i].color = CardsColorsData.CARDS_COLORS_ACCENT[j];

            if (response[i].id === this.currentTestId) {
                response[i].cardClass = this.activeClass;
            } else {
                response[i].cardClass = this.defaultClass;
            }


            response[i].number = i + 1;
            i++;
            j++;
        }
        this.assignedTests = response;
        console.log(this.assignedTests);

    }

    checkTest(test) {
        if (test.cardClass !== 'disabled') {
            this.router.navigate(['/teacher/check_test', test.id]);
            //
        } else {
            toast('Please, check your infinished test first', 5000, 'green');
        }

    }


}