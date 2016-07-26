import {Component, OnInit, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, NavigationEnd} from "@angular/router";
import {LoginService} from "../../login/login.service";

@Component({
    selector: 'header-component',
    templateUrl: '../app/common/header/header-logo.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})

export class HeaderComponent implements OnInit, OnDestroy {

    private sub;
    private pathname;
    private isLogin;

    constructor(private loginService: LoginService,
                private router: Router){}

    checkLogin () {
        this.pathname = window.location.href;
        return (this.pathname.indexOf("/login") !== -1);
    }

    goAway() {
        this.loginService.logOut(this.router);
    }

    ngOnInit () {
        this.checkLogin();
        
        this.sub = this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.checkLogin();
            }
        });
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

}