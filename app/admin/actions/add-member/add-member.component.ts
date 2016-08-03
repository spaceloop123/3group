import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {Http, Headers} from "@angular/http";

@Component({
    selector: 'add-member-component',
    templateUrl: 'app/admin/actions/add-member/add-member.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class AddMemberComponent implements OnInit {

    private member;
    private newMemberUrl;

    constructor(private http:Http) {
        this.member = {};
        this.newMemberUrl = '';
    }

    ngOnInit():any {
        this.member = {
            role: 'guest',
            firstName: '',
            lastName: '',
            email: ''
        };
        this.newMemberUrl = '/admin/new_';
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
        // TODO: (pay attention) Use CustomHttp + Observables !! Here is bad code now in context of app resources.
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http
            .post(this.newMemberUrl + this.member.role, JSON.stringify(this.member), {headers: headers})
            .toPromise()
            .then(response => console.log(response.json()));
    }
}