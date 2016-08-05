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

    notificationList:any;
    notificationObservable;
    notificationSubscription;

    @Input() seenNotification;
    @Output() notify:EventEmitter<any> = new EventEmitter<any>();

    constructor(private notificationsService:NotificationsService) {
        this.notificationList = [];
        this.notificationObservable = notificationsService.getData();
    }

    ngOnInit() {
        this.notificationSubscription = this.notificationObservable.subscribe(
            this.updateNotificationList.bind(this),
            err => {
                console.log('Error in Notification Service');
            }
        );
    }

    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }

    ngOnChanges(changes:SimpleChanges):any {
        let previousValue = changes['seenNotification'].previousValue;
        let currentValue = changes['seenNotification'].currentValue;
        if (previousValue instanceof Notification && currentValue instanceof NotificationActive) {
            if (currentValue.state === 'decline') {
                this.onDeclineNotification(previousValue, currentValue);
            }
        }
    }

    onDeclineNotification(previousValue, currentValue) {
        this.notificationsService.declineNotification(currentValue)
            .subscribe(res => {
                toast('Request was declined', 3000, 'green');
                console.log(previousValue.idx);
                console.log(currentValue.state);
                this.notificationList.splice(previousValue.idx, 1);
            }, err => {
                toast('Failed to decline the request', 3000, 'red darken-2');
            });
    }

    updateNotificationList(res) {
        this.notificationList = (res || []).map(
            (item, idx) => {
                let notification:Notification = new Notification(item);
                notification.idx = idx;
                return notification;
            }
        );
    }

    refreshNotifications() {
        this.notificationSubscription.unsubscribe();
        this.notificationSubscription = this.notificationObservable.subscribe(
            this.updateNotificationList.bind(this),
            err => {
                console.log('Error in Notification Service');
            }
        );
        if (this.notificationList.length === 0) {
            toast('Nothing new', 3000, 'orange darken-2');
        }
    }

    onNotificationClick(notification) {
        this.notify.emit(notification);
    }

    onDoneNotificationClick(notification) {
        this.notificationsService.deleteNotification(notification)
            .subscribe(res => {
                toast('Seen', 3000, 'green');
                this.notificationList.splice(notification.idx, 1);
            }, err => {
                toast('Failed', 3000, 'red darken-2');
            });
    }
}