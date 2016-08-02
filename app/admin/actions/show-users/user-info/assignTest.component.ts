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
    private sub;
    teacherList = [];

    onNotify(message:string):void {
        var field = <HTMLElement><any>document.getElementById("datepicker");
        if ((field.textContent === 'dd') || (field.textContent === 'mm') || (field.textContent === 'yyyy')) {
            console.log("Select Date");
        }
        else {
            console.log("OK");
        }
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
                that.setTeacherList(response.json());
            });
    }

    setTeacherList(response) {
        this.teacherList = this.teacherList.concat(response);
        console.log(this.teacherList);
    }

    // onScrollDown () {
    //     console.log('scrolled down!!');
    //     this.shownUsers += 10;
    //     this.getUsers();
    // }
    //
    // scrollOrNot() {
    //     if(this.scrollCount <= 10) {
    //         console.log(this.scrollCount);
    //         this.scrollCount++;
    //     } else {
    //         this.onScrollDown();
    //         this.scrollCount = 0;
    //     }
    // }

    checkInput(event) {
        console.log("checkInput")
    }


    constructor(private route:ActivatedRoute,
                private customHttp:CustomHttp) {
    }

    ngOnInit() {
        //TODO check test status for user and block test assignment if test is requested or has been assigned
        this.customHttp.checkRole();
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
