import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";
import {AddMemberComponent} from "./actions/add-member/add-member.component";
import {NotificationsComponent} from "./actions/notifications/notifications.component";
import {AddQuestionComponent} from "./actions/add-question/add-question.component";
import {Http} from "@angular/http";

@Component({
    selector: 'admin-component',
    templateUrl: 'app/admin/admin.home.2.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective, AddMemberComponent, NotificationsComponent, AddQuestionComponent]
})

export class AdminComponent implements OnInit{
    constructor(private http: Http,
                private router:Router) {

    }

    ngOnInit():any {
        
    }

    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    logOut() {
        var that = this;
        this.http
            .get("/dist/app/app.routes.js")
            .toPromise()
            .then(res => {
                console.log("logOut ADMIN COMPONENT THAT: " + res.json());
                that.router.navigate('/login');
            }, error =>console.log(error))
            .catch(that.handleError);
    }
}