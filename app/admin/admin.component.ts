import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {Http, Headers} from "@angular/http";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class AdminComponent {
    private member;
    private newMemberUrl = '/admin/new_';

    private statsFor;
    private statsForUrl = '/admin/show';

    constructor(private http:Http) {
        this.member = {
            role: 'guest',
            username: '',
            password: '',
            email: ''
        };
    }

    //*** Add a member ***

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
        this.http
            .post(this.newMemberUrl + this.member.role, JSON.stringify(this.member), {headers: headers})
            .toPromise()
            .then(response => console.log(response.json()));
    }

    //*** Show user's profile with filter ***

    isProfilesFieldsEmpty() {

    }

    showProfiles() {

    }

    private rows = [
        {username: "Pacan 1", role: "Admin", email: "email"},
        {username: "Pacan 2", role: "Teacher", email: "email"},
        {username: "Pacan 3", role: "Guest", email: "email"},
        {username: "Pacan 4", role: "User", email: "email"}
    ]
}