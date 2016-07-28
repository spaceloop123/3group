import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {AddMemberComponent} from "./actions/add-member/add-member.component";
import {NotificationsComponent} from "./actions/notifications/notifications.component";
import {AddQuestionComponent} from "./actions/add-question/add-question.component";
import {CustomHttp} from "../common/services/CustomHttp";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.2.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, AddMemberComponent, NotificationsComponent, AddQuestionComponent, AdminComponent],
    providers: [CustomHttp]
})

//public selectOptions:Array<any> = ['option1', 'option2', 'option3'];


export class AdminComponent implements OnInit {
    constructor(private customHttp:CustomHttp) {

    }
    navigateB(){

    }

    ngOnInit():any {
        this.customHttp.checkRole();
    }
}