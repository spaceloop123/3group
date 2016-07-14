///<reference path="../../typings/jquery/jquery.d.ts" />

import {Component, AfterViewInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AdminComponent implements AfterViewInit {
    private member = {
        role: 'guest',
        username: '',
        password: '',
        email: ''
    };

    ngAfterViewInit():any {
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    }

    changeMemberType() {
        if (this.member.role === 'guest') {
            this.member.role = 'teacher';
        } else {
            this.member.role = 'guest';
            this.member.username = '';
            this.member.password = '';
        }
    }
}