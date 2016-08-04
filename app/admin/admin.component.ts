import {Component, NgZone} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {AddMemberComponent} from "./actions/add-member/add-member.component";
import {NotificationsComponent} from "./actions/notifications/notifications.component";
import {AddQuestionComponent} from "./actions/add-question/add-question.component";
import {ShowUsersComponent} from "./actions/show-users/show-users.component";
import {NotificationActive} from "./actions/notifications/notification.active.class";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, ShowUsersComponent, AddMemberComponent, NotificationsComponent, AddQuestionComponent]
})

export class AdminComponent {
	private _currentTab:number;
	private _currentWidth:number;

    private currentNotification;
    
	constructor(ngZone:NgZone) {
		this.currentTab = 2;
		this.currentWidth = window.innerWidth;

		window.onresize = (e) => {
			ngZone.run(() => {
				this.currentWidth = window.innerWidth;
			});
		};
	}

    get currentWidth():number {
        return this._currentWidth;
    }

    set currentWidth(value:number) {
        this._currentWidth = value;
    }

    get currentTab():number {
        return this._currentTab;
    }

    set currentTab(value:number) {
        this._currentTab = value;
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
        this.currentNotification = new NotificationActive(this.currentNotification, 'decline');
    }

    onAssignNotification() {
        this.currentNotification = new NotificationActive(this.currentNotification, 'assign');
    }
}