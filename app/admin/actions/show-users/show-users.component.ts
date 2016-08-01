import {Component, OnInit, OnChanges} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {InfiniteScroll} from 'angular2-infinite-scroll';
import {CustomHttp} from '../../../common/services/CustomHttp';

@Component({
    selector: 'show-users-component',
    templateUrl: 'app/admin/actions/show-users/show-users.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, InfiniteScroll],
    providers: [CustomHttp]
})

export class ShowUsersComponent implements OnChanges, OnInit{

    private searchFilter = '';
    private scrollCount;
    userList = [];
    shownUsers = 0;

    // array = [];
    // sum = 30;

    constructor(private customHttp: CustomHttp,
                private router: Router) {
        this.searchFilter = '';
    }

    getUsers() {
        var that = this;
        this.customHttp.post('/admin/user_list', {n: this.shownUsers, searchFilter: this.searchFilter})
            .subscribe(response => {
                console.log('posted');
                that.setUserList(response.json());
            });
    }

    setUserList(response) {
        this.userList = this.userList.concat(response);
        console.log(this.userList);
    }

    onScrollDown () {
        console.log('scrolled down!!');
        this.shownUsers += 10;
        this.getUsers();
    }

    scrollOrNot() {
        if(this.scrollCount <= 10) {
            console.log(this.scrollCount);
            this.scrollCount++;
        } else {
            this.onScrollDown();
            this.scrollCount = 0;
        }
    }

    applySearch () {
        var that = this;
        console.log(this.searchFilter);
        this.customHttp.post('/admin/user_list', {n: this.shownUsers, searchFilter: this.searchFilter})
            .subscribe(response => {
                console.log('search posted');
                that.shownUsers = 0;
                console.log(response);
                that.userList = response.json();
            });
    }

    showDetails() {
        // this.router.navigate([user/]);
    }

    ngOnInit () {
        console.log('initialized');
        this.getUsers();
    }

    ngOnChanges () {

    }
}

