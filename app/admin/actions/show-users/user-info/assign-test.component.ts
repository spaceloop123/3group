import moment from "moment";

import {DatepickerComponent} from "./datepicker.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {MaterializeDirective, toast} from "angular2-materialize";
import {ChartsComponent} from "../../../../user/charts/charts.component";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";
import {StateService} from "../StateService";
import {AssignTestService} from "./assign-test.service";


@Component({
    templateUrl: 'app/admin/actions/show-users/user-info/assign-test.html',
    directives: [DatepickerComponent, ChartsComponent, CHART_DIRECTIVES, ROUTER_DIRECTIVES, MaterializeDirective, InfiniteScroll],
    providers: [StateService, AssignTestService]
})

export class AssignTestComponent implements OnInit {

    currentUser:any;
    assignedTeacher:any;
    userInfo:any;
    sub;
    isActive;
    teacherList = [];

    date:any = {};

    constructor(private route:ActivatedRoute,
                private assignTestService:AssignTestService) {
        this.userInfo = [];
    }

    ngOnInit() {
        // clear form
        this.assignedTeacher = null;
        this.date.dateFrom = new Date();
        this.date.dateTo = new Date();
        this.date.hoursFrom = this.date.hoursTo = 0;
        this.date.minutesFrom = this.date.minutesTo = 0;

        StateService.fromDetail = true;
        //TODO check test status for user and block test assignment if test is requested or has been assigned
        this.sub = this.route.params.subscribe(params => {
            this.currentUser = params['id'];
        });
        this.getUserInfo();
        this.getTeacherList();
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

    assignTeacher(teacher) {
        this.assignedTeacher = teacher;
        for (let i = 0; i < this.teacherList.length; i++) {
            this.teacherList[i].isActive = '';
        }
        this.assignedTeacher.isActive = 'active';
    }

    getTeacherList() {
        this.assignTestService.getTeacherList()
            .subscribe(res => {
                this.setTeacherList(res);
            });
    }

    setTeacherList(response) {
        this.teacherList = this.teacherList.concat(response);
    }

    getUserInfo() {
        console.log(' sdfsdf sdf sd= ' + JSON.stringify(this.currentUser));
        this.assignTestService.getUserInfoById({userId: this.currentUser})
            .subscribe(response => {
                console.log(response);
                this.setUser(response);
            });
    }

    setUser(response) {
        this.userInfo = response;
    }

    assignTest() {
        let date = this.getDate();

        if(!this.validateDate(date)) {
            toast('Enter correct date of test', 5000, 'red darken-2');
            return;
        } else if(!this.assignedTeacher) {
            toast('Choose the teacher first', 5000, 'red darken-2');
            return;
        }

        this.assignTestService.assignTest(this.currentUser, this.assignedTeacher, date)
            .subscribe(res => {
                toast("The test was successfully assigned", 5000, 'green');
            }, err => {
                toast('Failed to assign the test', 5000, 'red darken-2');
            });

        this.getUserInfo();
    }

    getDate() {
        return {
            dateFrom: moment(this.date.dateFrom, 'YYYY-MM-DD').hour(this.date.hoursFrom).minute(this.date.minutesFrom).toDate(),
            dateTo: moment(this.date.dateTo, 'YYYY-MM-DD').hour(this.date.hoursTo).minute(this.date.minutesTo).toDate()
        };
    }

    private validateDate(date) {
        return date && date.dateFrom < date.dateTo;
    }
}
