import {DatepickerComponent} from "./datepicker.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {MaterializeDirective} from "angular2-materialize";
import {ChartsComponent} from "../../../../user/charts/charts.component";
import {CustomHttp} from "../../../../common/services/CustomHttp";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";
import {StateService} from "../StateService";


@Component({

    templateUrl: 'app/admin/actions/show-users/user-info/assign-test.html',
    directives: [DatepickerComponent, ChartsComponent, CHART_DIRECTIVES, ROUTER_DIRECTIVES, MaterializeDirective, InfiniteScroll],
    providers: [StateService]
})

export class AssignTestComponent implements OnInit {

    currentUser:any;
    assignedTeacher:any;
    private userInfo:any;
    private sub;
    private isActive;
    teacherList = [];

    data = {
        dateFrom: new Date(),
        dateTo: new Date()
    };

    constructor(private route:ActivatedRoute,
                private customHttp:CustomHttp) {
    }

    assignTeacher(teacher) {
        this.assignedTeacher = teacher;
        for (let i = 0; i < this.teacherList.length; i++) {
            this.teacherList[i].isActive = '';
        }
        this.assignedTeacher.isActive = 'active';
        console.log(this.assignedTeacher);
    }

    getTeacherList() {
        var that = this;
        this.customHttp.get('/admin/teachers_list')
            .subscribe(response => {
                console.log('posted');
                that.setTeacherList(response);
            });
    }

    setTeacherList(response) {
        this.teacherList = this.teacherList.concat(response);
        console.log(this.teacherList);
    }

    getUserInfo() {
        //TODO add backend to this request
        this.customHttp.post('/admin/user_list', {id: this.currentUser})
            .subscribe(response => {
                console.log(response);
                this.userInfo = response;
            });
    }

    assignTest() {
        var a = $('#dateFrom').val();
        var b = $('#dateTo').val();
        this.data.dateFrom.setFullYear(parseInt(a.substr(0, 4)), parseInt(a.substr(5, 2)) - 1, parseInt(a.substr(8, 2)));
        this.data.dateFrom.setUTCHours($('#hoursFrom').val());
        this.data.dateFrom.setUTCMinutes($('#minutesFrom').val());

        this.data.dateTo.setFullYear(parseInt(b.substr(0, 4)), parseInt(b.substr(5, 2)) - 1, parseInt(b.substr(8, 2)));
        this.data.dateTo.setUTCHours($('#hoursTo').val());
        this.data.dateTo.setUTCMinutes($('#minutesTo').val());

        this.customHttp.post('/admin/assign_test', this.prepareDate(this.currentUser, this.assignedTeacher))
            .subscribe(res => {
                console.log('uletelo blin :D');
            }, err => {
                console.log('error :(');
            });
    }

    prepareDate(user, teacher) {
        return {
            'userId': user,
            'teacherId': teacher['id'],
            'timeFrom': this.data.dateFrom,
            'timeTo': this.data.dateTo
        };
    }

    ngOnInit() {
        StateService.fromDetail = true;
        //TODO check test status for user and block test assignment if test is requested or has been assigned
        this.getUserInfo();
        this.getTeacherList();
        this.sub = this.route.params.subscribe(params => {
            this.currentUser = params['id'];
            console.log('that.currentUser ' + this.currentUser);
        });
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

}
