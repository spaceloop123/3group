import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AdminComponent {
    private member = {
        role: 'guest',
        username: '',
        password: '',
        email: ''
    };

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