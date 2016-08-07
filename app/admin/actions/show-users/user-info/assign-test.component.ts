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

    public currentUser:any;
    public assignedTeacher:any;
    private userInfo:any;
    private data:any;
    private sub;
    private isActive;
    teacherList = [];

    constructor(private route:ActivatedRoute,
                private customHttp:CustomHttp) {
    }

    onNotify(message:string):void {
        var field = <HTMLElement><any>document.getElementById("datepicker");
        if ((field.textContent === 'dd') || (field.textContent === 'mm') || (field.textContent === 'yyyy')) {
            console.log("Select Date");
        }
        else {
            console.log("OK");
        }
    }

    //methods to interact with teacher list on assign test panel
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

    //end of teacher methods

    getUserInfo() {
        //TODO add backend to this request
        this.customHttp.post('/admin/user_list', {id: this.currentUser})
            .subscribe(response => {
                console.log(response);
                this.userInfo = response;
            });
    }

    assignTest() {
        this.data = {
            dateFrom: '15/07/2016',
            timeFrom: '14:00',
            dateTo: '15/07/2016',
            timeTo: '17:00',
            teacher: '5457430uhot798y4'
        };
        this.customHttp.post('/admin/assign_test', {test: this.data})
            .subscribe(response => {
                console.log('test has been assigned');
            });
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
