import {Component, NgZone, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {AddMemberComponent} from "./actions/add-member/add-member.component";
import {NotificationsComponent} from "./actions/notifications/notifications.component";
import {AddQuestionComponent} from "./actions/add-question/add-question.component";
import {ShowUsersComponent} from "./actions/show-users/show-users.component";
import {NotificationActive} from "./actions/notifications/notification.active.class";
import {StateService} from "./actions/show-users/StateService";
import {AssignTestService} from "./actions/show-users/user-info/assing-test.service";

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
    data = {
        dateFrom: new Date(),
        dateTo: new Date()
    };

    constructor(ngZone:NgZone, private assignTestService:AssignTestService) {
        this.currentWidth = window.innerWidth;

        window.onresize = () => {
            ngZone.run(() => {
                this.currentWidth = window.innerWidth;
            });
        };
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

    changeTab(currentTab) {
        this.currentTab = currentTab;
    }

    onNotificationReceived(responce):void {
        if (!responce) {
            return;
        }
        this.currentNotification = responce;
    }

    onDeclineNotification() {
        this.currentNotification = new NotificationActive(this.currentNotification, 'decline', null, null);
    }

    onAssignNotification() {
        this.getData();
        this.currentNotification = new NotificationActive(this.currentNotification, 'assign', this.assignedTeacher['id']
            , this.data);
        console.log('CARA : ' + JSON.stringify(this.currentNotification));
    }

    ngOnInit() {
        console.log(StateService.fromDetail);
        if (StateService.fromDetail === true) {
            this.currentTab = 3;
        } else {
            this.currentTab = 2;
        }
        this.changeTab(this.currentTab);
        this.getTeacherList();
    }

}