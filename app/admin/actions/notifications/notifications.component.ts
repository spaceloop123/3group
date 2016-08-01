import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {CustomHttp} from "../../../common/services/CustomHttp";

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
    private notifyList: any;
    /* {
     *   color: 'red/yellow/green',
     *   icon: 'error_outline/new_releases/done',
     *   title: 'Request/New/Done',
     *   firstLine: 'first line text',
     *   secondLine: 'second line text'
     *  }
     * */

    constructor(private customHttp:CustomHttp) {
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

    }

    pollFunction() {
        this.customHttp.get('/admin/notifications')
            .subscribe(response => {
                // setTimeout(function(response) {
                //     console.log(response);
                // }, 1000);
                console.log('h ' + response);
            });
    }

    ngOnInit() {
        console.log('init');
    }

    refreshNotifications() {
        alert("Refresh coming soon...");
    }
}