import moment from "moment";

import {Component, NgZone, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective, toast} from "angular2-materialize";
import {AddMemberComponent} from "./actions/add-member/add-member.component";
import {NotificationsComponent} from "./actions/notifications/notifications.component";
import {AddQuestionComponent} from "./actions/add-question/add-question.component";
import {ShowUsersComponent} from "./actions/show-users/show-users.component";
import {NotificationActive} from "./actions/notifications/notification.active.class";
import {StateService} from "./actions/show-users/StateService";
import {AssignTestService} from "./actions/show-users/user-info/assign-test.service";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, ShowUsersComponent, AddMemberComponent, NotificationsComponent, AddQuestionComponent],
    providers: [StateService, AssignTestService]
})

export class AdminComponent implements OnInit {

    currentTab:number;
    currentWidth:number;

    currentNotification;

    assignedTeacher;
    isActive;
    teacherList = [];

    date:any = {};

    constructor(ngZone:NgZone, private assignTestService:AssignTestService) {
        this.currentWidth = window.innerWidth;

        window.onresize = () => {
            ngZone.run(() => {
                this.currentWidth = window.innerWidth;
            });
        };
    }

    ngOnInit() {
        this.date.dateFrom = new Date();
        this.date.dateTo = new Date();
        this.date.hoursFrom = this.date.hoursTo = 0;
        this.date.minutesFrom = this.date.minutesTo = 0;

        if (StateService.fromDetail === true) {
            this.currentTab = 3;
        } else {
            this.currentTab = 2;
        }
    }

    changeTeacherState(teacher) {
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

    changeTab(currentTab) {
        this.currentTab = currentTab;
    }

    onNotificationReceived(responce):void {
        if (!responce) {
            return;
        }
        this.currentNotification = responce;
        this.getTeacherList();
    }

    onDeclineNotification() {
        this.currentNotification = new NotificationActive(this.currentNotification, 'decline', null, null);
    }

    onAssignNotification() {
        let date = this.getDate();

        if(!this.validateDate(date)) {
            toast('Enter correct date of test', 5000, 'red darken-2');
            return;
        } else if(!this.assignedTeacher) {
            toast('Choose the teacher first', 5000, 'red darken-2');
            return;
        }

        this.currentNotification = new NotificationActive(this.currentNotification, 'assign', this.assignedTeacher['id'], date);


        // clear form
        this.assignedTeacher = null;
        this.date.dateFrom = new Date();
        this.date.dateTo = new Date();
        this.date.hoursFrom = this.date.hoursTo = 0;
        this.date.minutesFrom = this.date.minutesTo = 0;
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