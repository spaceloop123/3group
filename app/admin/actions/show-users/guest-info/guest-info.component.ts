import moment from 'moment';

import {DatepickerComponent} from "../user-info/datepicker.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {MaterializeDirective, toast} from "angular2-materialize";
import {ChartsComponent} from "../../../../user/charts/charts.component";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";
import {StateService} from "../StateService";
import {AssignTestService} from "../user-info/assign-test.service";


@Component({
    templateUrl: 'app/admin/actions/show-users/guest-info/guest-info.html',
    directives: [DatepickerComponent, ChartsComponent, CHART_DIRECTIVES, ROUTER_DIRECTIVES, MaterializeDirective, InfiniteScroll],
    providers: [StateService, AssignTestService]
})

export class GuestInfoComponent implements OnInit {

    currentUser:any;
    assignedTeacher:any;
    guestInfo:any;
    sub;
    isActive;
    teacherList = [];

    dateFrom:any;
    dateTo:any;

    constructor(private route:ActivatedRoute,
                private assignTestService:AssignTestService) {
        this.guestInfo = [];
    }

    ngOnInit() {
        StateService.fromDetail = true;
        //TODO check test status for user and block test assignment if test is requested or has been assigned
        this.sub = this.route.params.subscribe(params => {
            this.currentUser = params['id'];
        });
        this.getGuestInfo();
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

    getGuestInfo() {
        console.log(' sdfsdf sdf sd= ' + JSON.stringify(this.currentUser));
        this.assignTestService.getUserInfoById({userId: this.currentUser})
            .subscribe(response => {
                console.log(response);
                this.setGuest(response);
            });
    }

    setGuest(response) {
        this.guestInfo = response;
        console.log('' + response.assignable);
    }

    assignTest() {
        let date = this.getDate();

        if(!this.validateDate(date)) {
            toast('Date To is earlier than Date From', 3000, 'red darken-2');
            return;
        }
        this.assignTestService.assignTest(this.currentUser, this.assignedTeacher, date)
            .subscribe(res => {
                toast("The test was successfully assigned", 3000, 'green');
            }, err => {
                toast('Failed to assign the test', 3000, 'red darken-2');
            });
    }

    getDate() {
        this.dateTo = moment(this.dateTo, 'YYYY-MM-DD').hour(+$('#hoursTo').val()).minute(+$('#minutesTo').val()).toDate();
        this.dateFrom = moment(this.dateFrom, 'YYYY-MM-DD').hour(+$('#hoursFrom').val()).minute(+$('#minutesFrom').val()).toDate();

        return {
            dateFrom: this.dateFrom,
            dateTo: this.dateTo
        };
    }

    private validateDate(date) {
        return date && date.dateFrom < date.dateTo;
    }

}
