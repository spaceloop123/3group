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

    dateFrom:any;
    dateTo:any;

    constructor(ngZone:NgZone, private assignTestService:AssignTestService) {
        this.currentWidth = window.innerWidth;

        window.onresize = () => {
            ngZone.run(() => {
                this.currentWidth = window.innerWidth;
            });
        };
    }

    ngOnInit() {
        this.dateFrom = new Date();
        this.dateTo = new Date();

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
        this.teacherList = [];
        this.teacherList = this.teacherList.concat(response);
    }

    getDate() {
        return {
            dateFrom: moment(this.dateFrom, 'YYYY-MM-DD').hour(+$('#hoursFrom').val()).minute(+$('#minutesFrom').val()).toDate(),
            dateTo: moment(this.dateTo, 'YYYY-MM-DD').hour(+$('#hoursTo').val()).minute(+$('#minutesTo').val()).toDate()
        };
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

        if (!this.validateDate(date)) {
            toast('Enter correct date of test', 5000, 'red darken-2');
            return;
        } else if (!this.assignedTeacher) {
            toast('Choose the teacher first', 5000, 'red darken-2');
            return;
        }

        this.currentNotification = new NotificationActive(this.currentNotification, 'assign', this.assignedTeacher['id'], date);

        this.assignedTeacher = null;
        this.dateFrom = new Date();
        this.dateTo = new Date();
    }

    private validateDate(date) {
        return date && date.dateFrom < date.dateTo;
    }
}