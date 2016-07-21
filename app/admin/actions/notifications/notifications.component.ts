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
     *   icon: 'error_outline/new_releases/done_all',
     *   title: 'Error/New test/Done',
     *   firstLine: 'first line text',
     *   secondLine: 'second line text'
     *  }
     * */

    constructor(private http:Http) {
        this.notifyList = [
            {
                color: 'yellow',
                icon: 'new_releases',
                title: 'New test',
                firstLine: 'first line',
                secondLine: 'second line'
            },
            {
                color: 'yellow',
                icon: 'new_releases',
                title: 'New test',
                firstLine: 'first line',
                secondLine: 'second line'
            },
            {
                color: 'yellow',
                icon: 'new_releases',
                title: 'New test',
                firstLine: 'first line',
                secondLine: 'second line'
            },
            {
                color: 'yellow',
                icon: 'new_releases',
                title: 'New test',
                firstLine: 'first line',
                secondLine: 'second line'
            },
            {
                color: 'yellow',
                icon: 'new_releases',
                title: 'New test',
                firstLine: 'first line',
                secondLine: 'second line'
            },
            {
                color: 'yellow',
                icon: 'new_releases',
                title: 'New test',
                firstLine: 'first line',
                secondLine: 'second line'
            }
        ];
    }

    ngOnInit():any {

    }

    refreshNotifications() {
        alert("Refresh coming soon...");
    }
}