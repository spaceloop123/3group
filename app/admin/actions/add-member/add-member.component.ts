import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective, toast} from "angular2-materialize";
import {CustomHttp} from "../../../common/services/CustomHttp";
import {AssignTestService} from "../show-users/user-info/assign-test.service";

@Component({
    selector: 'add-member-component',
    templateUrl: 'app/admin/actions/add-member/add-member.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [AssignTestService]
})

export class AddMemberComponent implements OnInit {

    member;
    newMemberUrl;

    assignedTeacher;
    isActive;
    teacherList = [];
    data = {
        dateFrom: new Date(),
        dateTo: new Date()
    };

    constructor(private customHttp:CustomHttp, private assignTestService:AssignTestService) {
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
        if (!this.isValidEmail()) {
            return toast('Wrong email', 3000, 'amber darken-1');
        }
        if (this.member.role === 'guest') {
            this.onGuestAdd();
        } else {
            this.onTeacherAdd();
        }
    }

    onTeacherAdd() {
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
    }

    handleError(error) {
        toast('Failed to add new member', 3000, 'red darken-2');
    }

    onGuestAdd() {
        this.getTeacherList();
        $('#addGuestModal').openModal();
    }

    onAssignTestForGuest() {
        /*this.customHttp
         .post(this.newMemberUrl + this.member.role, this.member)
         .subscribe(
         res => {
         toast(this.member.firstName + ' ' + this.member.lastName + ' was successfully added', 3000, 'green');
         this.clearForm();
         },
         err => this.handleError(err)
         );*/

        this.customHttp.post('/admin/new_guest', this.prepareGuest())
            .subscribe(res => {
                console.log("Service = " + JSON.stringify(this.member));
                toast('The test was assigned to ' + this.member.firstName + ' ' + this.member.lastName,
                    3000, 'green');
            }, err => {
                toast('Failed to assign the test to ' + this.member.firstName + ' ' + this.member.lastName,
                    3000, 'red darken-2');
            });
        this.clearForm();
    }

    prepareGuest() {
        return {
            'firstName': this.member.firstName,
            'lastName': this.member.lastName,
            'email': this.member.email,
            'teacherId': this.assignedTeacher['id'],
            'timeFrom': this.data.dateFrom,
            'timeTo': this.data.dateTo
        };
    }

    changeChoseTeacherState(teacher) {
        this.assignedTeacher = teacher;
        for (let i = 0; i < this.teacherList.length; i++) {
            this.teacherList[i].isActive = '';
        }
        this.assignedTeacher.isActive = 'active';
    }

    getTeacherList() {
        this.assignTestService.getTeacherList()
            .subscribe(res => {
                this.setTeacherList(res);
            });
    }

    setTeacherList(response) {
        this.teacherList = this.teacherList.concat(response);
    }

    getData() {
        var a = $('#dateFrom-guest').val();
        var b = $('#dateTo-guest').val();
        this.data.dateFrom.setFullYear(parseInt(a.substr(0, 4)), parseInt(a.substr(5, 2)) - 1, parseInt(a.substr(8, 2)));
        this.data.dateFrom.setUTCHours($('#hoursFrom-guest').val());
        this.data.dateFrom.setUTCMinutes($('#minutesFrom-guest').val());
        this.data.dateTo.setFullYear(parseInt(b.substr(0, 4)), parseInt(b.substr(5, 2)) - 1, parseInt(b.substr(8, 2)));
        this.data.dateTo.setUTCHours($('#hoursTo-guest').val());
        this.data.dateTo.setUTCMinutes($('#minutesTo-guest').val());
    }
}