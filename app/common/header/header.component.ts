import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {LoginService} from "../../login/login.service";

@Component({
    selector: 'header-component',
    templateUrl: '../app/common/header/header-logo.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})

export class HeaderComponent {
    constructor(private loginService: LoginService,
                private router: Router){}

    public goAway() {
        this.loginService.logOut(this.router);
    }
}