import {Component, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {InfiniteScroll} from 'angular2-infinite-scroll';
import {AdminComponent} from '../../admin.component';
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
    private scrollConfig;

    @Input tab: number;

    // array = [];
    // sum = 30;

    constructor(private customHttp: CustomHttp) { }

    getUsers() {

        var that = this;
        this.customHttp.post('/admin/user_list', {n: this.shownUsers})
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
        console.log(this.tab);
        if(this.scrollCount <= 10) {
            console.log(this.scrollCount);
            this.scrollCount++;
        } else {
            this.onScrollDown();
            this.scrollCount = 0;
        }
    }

    ngOnInit () {
        console.log('initialized');
        this.getUsers();
    }
}