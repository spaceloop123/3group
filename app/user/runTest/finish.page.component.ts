import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {Component, OnDestroy, OnInit, NgZone} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'app/user/runTest/finish-page.html',
    directives:     [REACTIVE_FORM_DIRECTIVES,  ROUTER_DIRECTIVES]
})

export class FinishTestPageComponent implements OnInit, OnDestroy {
    sub;
    role;
    timeout_id: any;
    cardSize: string;
    currentWidth:number;


    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http,
                ngZone:NgZone){
        this.role = 'nobody';
        this.currentWidth = window.innerWidth;
        this.changeCardSize();

        window.onresize = () => {
            ngZone.run(() => {
                this.currentWidth = window.innerWidth;
                this.changeCardSize();
            });
        };
    }

    ngOnInit(){
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.role = params['role'];
            console.log('that.status ' + that.role);

        });
        //this.autoExit();


    }

    ngOnDestroy(){
        this.sub.unsubscribe();
        clearTimeout(this.timeout_id);

    }

    // autoExit(){
    //     var that = this;
    //     this.timeout_id = setTimeout(() => that.exit(), 5000);
    // }

    changeCardSize() {
        if (this.currentWidth > 768) {
            this.cardSize = 'large';
        } else {
            this.cardSize = 'medium';
        }
    }

    exit(){
        var link = (this.role === "user") ? "/user" : "/logo";//потом сделать для quest logOut
        // TODO (pay attention) Aga no ispolsuite TODO-shki dlya takih zametok ))
        this.router.navigate([link]);
    }
}