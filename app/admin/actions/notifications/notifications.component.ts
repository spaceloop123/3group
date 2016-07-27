import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {Http} from "@angular/http";

@Component({
    selector: 'notifications-component',
    templateUrl: 'app/admin/actions/notifications/notifications.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class NotificationsComponent implements OnInit {
    /*
     * list of notifications
     * format:
     */
    private notifyList;
    /* {
     *   color: 'red/yellow/green',
     *   icon: 'error_outline/new_releases/done',
     *   title: 'Request/New/Done',
     *   firstLine: 'first line text',
     *   secondLine: 'second line text'
     *  }
     * */

    constructor(private http:Http) {
        //this.notifyList = [];
        this.notifyList = [

            {
                color: 'red',
                icon: 'error_outline',
                title: 'Request',
                firstLine: 'Username requested test',
                secondLine: 'Accept or decline'
            },
            {
                color: 'green',
                icon: 'done',
                title: 'Done',
                firstLine: 'Username passed test',
                secondLine: 'Teachername checked test'
            }
        ];
    }

    ngOnInit():any {

    }

    refreshNotifications() {
        alert("Refresh coming soon...");
    }
}