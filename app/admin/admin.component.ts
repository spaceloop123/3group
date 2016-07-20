import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AuthService} from '../common/auth/auth.service';
import {MaterializeDirective} from "angular2-materialize";
import {Http, Headers} from "@angular/http";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [AuthService]
})

export class AdminComponent implements OnInit{
    private member;
    private newMemberUrl = '/admin/new_';

    private statsFor;
    private statsForUrl = '/admin/show';

    constructor(
        private http:Http,
        private auth: AuthService) {
        this.member = {
            role: 'guest',
            firstName: '',
            lastName: '',
            email: ''
        };
    }

    //*** Add a member ***

    changeMemberType() {
        if (this.member.role === 'guest') {
            this.member.role = 'teacher';
        } else {
            this.member.role = 'guest';
        }
    }

    isMemberFieldsEmpty() {
        return (this.member.email != '' && this.member.firstName != '' && this.member.lastName != '');
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

    //handleError(error:any) {
        //return Promise.reject(error.message || error);
     //   this.router.navigate(['/error', error]);
    //}

    ngOnInit() {
        this.auth.checkAuth();
    }

    private rows = [
        {username: "Pacan 1", role: "Admin", email: "email"},
        {username: "Pacan 2", role: "Teacher", email: "email"},
        {username: "Pacan 3", role: "Guest", email: "email"},
        {username: "Pacan 4", role: "User", email: "email"}
    ]
}