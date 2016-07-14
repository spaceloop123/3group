import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Http, Headers} from "@angular/http";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AdminComponent {
    private member;
    private newMemberUrl = '/admin/new-';

    constructor(private http:Http) {
        this.member = {
            role: 'guest',
            username: '',
            password: '',
            email: ''
        };
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

    isMemberFieldsEmpty() {
        if (this.member.role === 'guest') {
            return this.member.email != '';
        } else {
            return (this.member.email != '' && this.member.username != '' && this.member.password != '');
        }
    }

    addUser() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(this.http.post(this.newMemberUrl + this.member.role, JSON.stringify(this.member), {headers: headers})
            .toPromise());
    }

    
}