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
    timeout_id: any;


    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http){
        this.role = 'nobody';
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
        clearTimeout(this.timeout_id);

    }

    autoExit(){
        var that = this;
        this.timeout_id = setTimeout(() => that.exit(), 5000);
    }

    exit(){
        var link = (this.role === "user") ? "/home" : "/logo";//потом сделать для quest logOut
        this.router.navigate([link]);
    }
}