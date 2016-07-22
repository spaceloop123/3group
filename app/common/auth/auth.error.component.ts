import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: './app/common/auth/error-template.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AuthErrorComponent implements OnInit, OnDestroy {

    public errorCode:any;
    private sub;

    constructor(private route:ActivatedRoute) {
    }

    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.errorCode = params['code'];
        });
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

}
