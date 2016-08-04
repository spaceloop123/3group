import {Component, OnInit, OnDestroy, Output, EventEmitter, Input, OnChanges, SimpleChanges} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective, toast} from "angular2-materialize";
import {NotificationsService} from "./notifications.service";
import {Notification} from "./notifications.class";
import {NotificationActive} from "./notification.active.class";

@Component({
    selector: 'notifications-component',
    templateUrl: 'app/admin/actions/notifications/notifications.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [NotificationsService]
})

export class NotificationsComponent implements OnInit, OnDestroy, OnChanges {

    private _notificationList:any;
    private notificationObservable;
    private notificationSubscription;

    @Input() seenNotification;
    @Output() notify:EventEmitter<any> = new EventEmitter<any>();

    constructor(private notificationsService:NotificationsService) {
        this._notificationList = [];
        this.notificationObservable = notificationsService.getData();
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

    ngOnChanges(changes:SimpleChanges):any {
        let previousValue = changes['seenNotification'].previousValue;
        let currentValue = changes['seenNotification'].currentValue;
        if (previousValue instanceof Notification && currentValue instanceof NotificationActive) {
            this.notificationsService.declineNotification(currentValue)
                .subscribe(res => {
                    toast('Request was declined', 3000, 'green');
                    let idx = this.notificationList.indexOf(previousValue);
                    console.log(JSON.stringify(previousValue) + ' ====== ' + idx);
                    if (idx !== -1) {
                        this.notificationList.splice(idx, 1);
                    }
                }, err => {
                    toast('Failed to decline the request', 3000, 'red darken-2');
                });
        }
    }

    findNotificationInNotificationList(notification, idx, array) {

    }

    updateNotificationList(res) {
        this.notificationList = [];
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
        this.notify.emit(notification);
    }


}