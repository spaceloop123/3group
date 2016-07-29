import {Component, OnInit, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {AddMemberComponent} from "./actions/add-member/add-member.component";
import {NotificationsComponent} from "./actions/notifications/notifications.component";
import {AddQuestionComponent} from "./actions/add-question/add-question.component";
import {CustomHttp} from "../common/services/CustomHttp";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, AddMemberComponent, NotificationsComponent, AddQuestionComponent],
    providers: [CustomHttp]
})

export class AdminComponent implements OnInit {
    get currentTab():number {
        return this._currentTab;
    }

    set currentTab(value:number) {
        this._currentTab = value;
    }

    private _currentTab: number;

    constructor(private customHttp:CustomHttp) {
        this.currentTab = 2;
    }

    changeTab(currentTab) {
        this.currentTab = currentTab;
        console.log(this.currentTab);
    }

    ngOnInit():any {
        this.customHttp.checkRole();
    }
}