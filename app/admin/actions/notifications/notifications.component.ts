import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {NotificationsService} from "./notifications.service";

@Component({
    selector: 'notifications-component',
    templateUrl: 'app/admin/actions/notifications/notifications.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [NotificationsService]
})

export class NotificationsComponent implements OnInit {
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

    private observable:any;

    constructor(private notificationsService:NotificationsService) {
        this.notifyList = [];
        // this.notifyList = [
        //
        //     {
        //         color: 'red',
        //         icon: 'error_outline',
        //         title: 'Request',
        //         firstLine: 'Username requested test',
        //         secondLine: 'Accept or decline'
        //     },
        //     {
        //         color: 'green',
        //         icon: 'done',
        //         title: 'Done',
        //         firstLine: 'Username passed test',
        //         secondLine: 'Teachername checked test'
        //     }
        // ];

        /*Observable.interval(800)
            .map((x) => x + 1)
            .subscribe((x) => {
                console.log('catched ' + x);
         });*/
    }

    ngOnInit() {
        console.log('init');
    }

    refreshNotifications() {
        alert("Refresh coming soon...");
    }
}