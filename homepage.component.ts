import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {Http} from "@angular/http";
import {TeacherComponent} from '../teacher/teacher.component';
import {UserComponent} from "../user/user.component";


@Component({
    templateUrl: 'app/homepage/homepage.html',
    //styleUrls: ['../assets/libs/materialize.css', ---does nothing
    //    '../assets/libs/materialize.min.css',],

    directives: [ROUTER_DIRECTIVES, TeacherComponent, UserComponent]
})

export class HomepageComponent implements OnInit, OnDestroy {
    status;
    availTest;

    private sub;
    
    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.availTest = true;
    }

    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.status = params['status'];
            console.log('that.status ' + that.status);
        });
        if (this.status === 'user' || this.status === 'guest') {
            //this.getData();
        }
        console.log(this.availTest);
    }

    getData() {
        var that = this;
        this.http.get('/availtest')
            .toPromise()
            .then(response => that.availTest = response.json().data)
            .catch(this.handleError);
    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

