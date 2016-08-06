import {Component, OnInit, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {InfiniteScroll} from "angular2-infinite-scroll";
import {CustomHttp} from "../../../common/services/CustomHttp";
import {StateService} from "./StateService";

@Component({
    selector: 'show-users-component',
    templateUrl: 'app/admin/actions/show-users/show-users.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, InfiniteScroll],
    providers: [CustomHttp, StateService]
})

export class ShowUsersComponent implements OnInit, OnDestroy {

    private searchFilter:string;
    private isThereDataToScroll:boolean;
    userList = [];
    shownUsers = 0;

    // array = [];
    // sum = 30;

    constructor(private customHttp:CustomHttp,
                private router:Router) {
    }

    getUsers() {
        var that = this;
        this.customHttp.post('/admin/user_list', {n: this.shownUsers, searchFilter: this.searchFilter})
            .subscribe(response => {
                console.log('posted');
                that.setUserList(response);
            });
    }

    setUserList(response) {
        if (response.length === 0) {
            this.isThereDataToScroll = false;
        } else {
            this.isThereDataToScroll = true;
        }
        this.userList = this.userList.concat(response);
        console.log(this.userList);
    }

    renewUserList(response) {
        if (response.length === 0) {
            this.isThereDataToScroll = false;
        } else {
            this.isThereDataToScroll = true;
        }
        this.userList = response;
        console.log(this.userList);
    }

    onScrollDown() {
        console.log('scrolled down!!');
        this.shownUsers += 10;
        this.getUsers();
    }

    applySearch() {
        //TODO remove var that = this in all requests. Lambda function doesn't create it's own lexical environment.
        console.log(this.searchFilter);
        this.customHttp.post('/admin/user_list', {n: this.shownUsers, searchFilter: this.searchFilter})
            .subscribe(response => {
                console.log('search posted');
                console.log(response);
                this.renewUserList(response);
            });
        this.shownUsers = 0;
    }

    showDetails(user) {
        if (user.role === 'user') {
            this.router.navigate(['/admin/assignTest', user.id]);
        } else if (user.role === 'teacher') {
            this.router.navigate(['/admin/teacher_info', user.id]);
        }
    }

    ngOnInit() {
        console.log(StateService.searchFilter);
        console.log(this.searchFilter);
        if (StateService.fromDetail == true) {
            this.searchFilter = StateService.searchFilter;
        } else {
            this.searchFilter = '';
        }
        console.log('initialized');
        this.getUsers();
    }

    ngOnDestroy() {
        StateService.searchFilter = this.searchFilter;
    }
}

