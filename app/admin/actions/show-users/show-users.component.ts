import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {InfiniteScroll} from 'angular2-infinite-scroll';
import {CustomHttp} from '../../../common/services/CustomHttp';

@Component({
    selector: 'show-users-component',
    templateUrl: 'app/admin/actions/show-users/show-users.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, InfiniteScroll],
    providers: [CustomHttp]
})

export class ShowUsersComponent {

    private scrollCount;
    userList = [];
    shownUsers = 0;

    // array = [];
    // sum = 30;

    constructor(private customHttp: CustomHttp) { }

    getUsers() {

        var that = this;
        this.customHttp.post('/admin/user_list', {n: this.shownUsers})
            .subscribe(response => {
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
        if(this.scrollCount <= 4) {
            console.log(this.scrollCount);
            this.scrollCount++;
        } else {
            this.onScrollDown();
            this.scrollCount = 0;
        }
    }

    ngOnInit () {
        this.getUsers();
        //this.shownUsers = this.userList.slice(0, 5);
    }

}