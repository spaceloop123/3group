import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {AddMemberComponent} from "./actions/add-member/add-member.component";
import {NotificationsComponent} from "./actions/notifications/notifications.component";
import {AddQuestionComponent} from "./actions/add-question/add-question.component";
import {Http, Headers} from "@angular/http";
import {CustomHttp} from "../common/services/CustomHttp";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.2.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, AddMemberComponent, NotificationsComponent, AddQuestionComponent],
    providers: [CustomHttp]
})

export class AdminComponent implements OnInit {
    constructor(private customHttp:CustomHttp) {

    }

    ngOnInit():any {
        this.customHttp.checkRole();
    }
}