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
        console.log('sdfsdf');
    }

    ngOnInit() {
        this.notificationSubscription = this.notificationObservable.subscribe(res => {
            if (res.status === 200) {
                this.updateNotificationList(res.json());
            }
        }, err => {
            console.log('Error in Notification Service');
        });
    }

    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }

    updateNotificationList(list) {
        let that = this;
        let newNotificationsList = [];
        for (let i = 0; i < list.length; ++i) {
            let notification = new Notification(list[i]);
            newNotificationsList.push(notification);
        }
        this.notificationList = newNotificationsList;
        console.log(JSON.stringify(this.notificationList));
    }

    refreshNotifications() {
        alert("Refresh coming soon...");
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