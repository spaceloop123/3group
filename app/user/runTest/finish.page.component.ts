import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {Constants} from "../../common/constants/constants.data";

@Component({
    templateUrl: 'app/user/runTest/finish-page.html',
    directives:     [REACTIVE_FORM_DIRECTIVES,  ROUTER_DIRECTIVES]
})

export class FinishTestPageComponent implements OnInit, OnDestroy {
    sub;
    role;


    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http){
    }
    ngOnInit(){
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.role = params['role'];
            console.log('that.status ' + that.role);

        });
        this.autoExit();
    }
    ngOnDestroy(){
        this.sub.unsubscribe();

    }

    autoExit(){
        var that = this;
        //setTimeout(() => that.exit(), 5000);
    }

    exit(){
        var link = (this.role === "user") ? "/user" : "/logo";//потом сделать для quest logOut
        this.router.navigate([link]);
    }
}