import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective, toast} from "angular2-materialize";
import {CustomHttp} from "../../../common/services/CustomHttp";

@Component({
    selector: 'add-member-component',
    templateUrl: 'app/admin/actions/add-member/add-member.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})

export class AddMemberComponent implements OnInit {

    private member;
    private newMemberUrl;

    constructor(private customHttp:CustomHttp) {
        this.member = {};
        this.newMemberUrl = '';
    }

    ngOnInit():any {
        this.clearForm();
        this.newMemberUrl = '/admin/new_';
    }

    changeMemberType() {
        if (this.member.role === 'guest') {
            this.member.role = 'teacher';
        } else {
            this.member.role = 'guest';
        }
    }

    isMemberFieldsEmpty() {
        return (this.member.email === '' || this.member.firstName === '' || this.member.lastName === '');
    }

    isValidEmail() {
        let regex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        return regex.test(this.member.email);
    }

    onSubmit() {
        if (this.isMemberFieldsEmpty()) {
            return toast('Fill in all fields', 3000, 'amber darken-1');
        }
        // if (!this.isValidEmail()) {
        //     return toast('Wrong email', 3000, 'amber darken-1');
        // }
        this.customHttp
            .post(this.newMemberUrl + this.member.role, this.member)
            .subscribe(
                res => {
                    toast(this.member.firstName + ' ' + this.member.lastName + ' was successfully added', 3000, 'green');
                    this.clearForm();
                },
                err => this.handleError(err)
            );
    }

    clearForm() {
        this.member = {
            role: 'guest',
            firstName: '',
            lastName: '',
            email: ''
        };

        /*$('#add-member-form').find('label').removeClass('active');
         $('#add-member-form').find('materialInput:text').val('');*/

    }

    handleError(error) {
        toast('Failed to add new member', 3000, 'red darken-2');
    }
}