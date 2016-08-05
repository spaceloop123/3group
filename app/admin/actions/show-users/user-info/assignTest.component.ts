import {DatepickerComponent} from "./datepicker.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {MaterializeDirective} from "angular2-materialize";
import {ChartsComponent} from "../../../../user/charts/charts.component";
import {CustomHttp} from "../../../../common/services/CustomHttp";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";


@Component({

    templateUrl: 'app/admin/actions/show-users/user-info/assignTest.html',
    directives: [DatepickerComponent, ChartsComponent, CHART_DIRECTIVES, ROUTER_DIRECTIVES, MaterializeDirective, InfiniteScroll],

})

export class AssignTestComponent implements OnInit {
    public currentUser:any;
    public assignedTeacher:any;
    private data: any;
    private sub;
    teacherList = [];

    onNotify(responce):void {
        console.log('Notify : ' + responce);
    }

    assignTeacher(teacher) {
        this.assignedTeacher = teacher;
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

    assignTest(){
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

    constructor(private route:ActivatedRoute,
                private customHttp:CustomHttp) {
    }

    ngOnInit() {
        //TODO check test status for user and block test assignment if test is requested or has been assigned
        this.getTeacherList();
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.currentUser = params['id'];
            console.log('that.currentUser ' + that.currentUser);
        });
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

}
