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

    private userList: any;
    items = 30;

    // array = [];
    // sum = 30;

    constructor(private customHttp: CustomHttp) {
         for (let i = 0; i < this.items; ++i) {
             this.userList.push(i);
         }
    }

    getUsers() {

        var that = this;
        this.customHttp.get('/admin/user_list')
            .subscribe(response => {
                that.setUserList(response.json());
            });
    }

    setUserList(response) {
        this.userList = response;
        console.log(this.userList);
    }

    onScrollDown () {
        console.log('scrolled down!!');

        // add another 30 items
        const start = this.sum;
        this.sum += 20;
        for (let i = start; i < this.sum; ++i) {
            this.array.push(i);
        }
    }

    onScrollUp () {
        console.log('scrolled up!!');

        // remove last 30 items
        const start = this.sum;
        this.sum += 20;
        for (let i = start; i < this.sum; ++i) {
            this.array.push(i);
        }
    }

    ngOnInit () {
        this.getUsers();
    }

}