import {Component, OnInit, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {NotificationsService} from "./notifications.service";

@Component({
    selector: 'notifications-component',
    templateUrl: 'app/admin/actions/notifications/notifications.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [NotificationsService]
})

export class NotificationsComponent implements OnInit, OnDestroy {
    /*
     * list of notifications
     * format:
     */
    private notifyList:any;
    /* {
     *   color: 'red/yellow/green',
     *   icon: 'error_outline/new_releases/done',
     *   title: 'Request/New/Done',
     *   firstLine: 'first line text',
     *   secondLine: 'second line text'
     *  }
     * */

    private notificationObservable;
    private notificationSubscription;

    constructor(private notificationsService:NotificationsService) {
        this.notifyList = [];
        this.notificationObservable = notificationsService.getData();
    }

    ngOnInit() {
        this.notificationSubscription = this.notificationObservable.subscribe(res => {
            console.log('Responce = ' + res);
        }, err => {
            console.log('Error in Notififcation Service');
        });
    }

    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }

    refreshNotifications() {
        alert("Refresh coming soon...");
    }
}