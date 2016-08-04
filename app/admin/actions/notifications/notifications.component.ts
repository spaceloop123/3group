import {Component, OnInit, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {NotificationsService} from "./notifications.service";
import {Notification} from "./notifications.class";

@Component({
    selector: 'notifications-component',
    templateUrl: 'app/admin/actions/notifications/notifications.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [NotificationsService]
})

export class NotificationsComponent implements OnInit, OnDestroy {

    private _notificationList:any;
    private notificationObservable;
    private notificationSubscription;

    private currentNotificationIdx;

    constructor(private notificationsService:NotificationsService) {
        this._notificationList = [];
        this.notificationObservable = notificationsService.getData();

        this.currentNotificationIdx = -1;
    }

    ngOnInit() {
        this.notificationSubscription = this.notificationObservable.subscribe(res => {
            this.updateNotificationList(res);
        }, err => {
            console.log('Error in Notification Service');
        });
    }

    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }

    updateNotificationList(res) {
        for (let i = 0; i < res.length; ++i) {
            this.notificationList[i] = new Notification(res[i]);
        }
    }

    refreshNotifications() {
        this.notificationSubscription.unsubscribe();
        this.notificationSubscription = this.notificationObservable.subscribe(res => {
            this.updateNotificationList(res);
        }, err => {
            console.log('Error in Notification Service');
        });
    }

    get notificationList():any {
        return this._notificationList;
    }

    set notificationList(value:any) {
        this._notificationList = value;
    }

    onNotificationClick(notification, idx) {
        console.log('Clicked on : ' + JSON.stringify(notification));
        this.currentNotificationIdx = idx;
    }
}