import {DatepickerComponent} from "./datepicker.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {MaterializeDirective, toast} from "angular2-materialize";
import {ChartsComponent} from "../../../../user/charts/charts.component";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";
import {StateService} from "../StateService";
import {AssignTestService} from "./assing-test.service";


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
    data = {
        dateFrom: new Date(),
        dateTo: new Date()
    };

    constructor(private route:ActivatedRoute,
                private assignTestService:AssignTestService) {
    }

    ngOnInit() {
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
        this.assignTestService.getUserInfoById({userId: this.currentUser})
            .subscribe(response => {
                console.log(response);
                this.setUser(response);
            });
    }

    setUser(response) {
        this.userInfo = response;
        console.log(this.userInfo.email);
    }

    assignTest() {
        this.getData();
        this.assignTestService.assignTest(this.currentUser, this.assignedTeacher, this.data)
            .subscribe(res => {
                toast("The test was successfully assigned", 3000, 'green');
            }, err => {
                toast('Failed to assign the test', 3000, 'red darken-2');
            });
    }

    getData() {
        var a = $('#dateFrom').val();
        var b = $('#dateTo').val();
        this.data.dateFrom.setFullYear(parseInt(a.substr(0, 4)), parseInt(a.substr(5, 2)) - 1, parseInt(a.substr(8, 2)));
        this.data.dateFrom.setUTCHours($('#hoursFrom').val());
        this.data.dateFrom.setUTCMinutes($('#minutesFrom').val());
        this.data.dateTo.setFullYear(parseInt(b.substr(0, 4)), parseInt(b.substr(5, 2)) - 1, parseInt(b.substr(8, 2)));
        this.data.dateTo.setUTCHours($('#hoursTo').val());
        this.data.dateTo.setUTCMinutes($('#minutesTo').val());
    }
}
