import {Component} from "@angular/core";
import {LoginData} from "./login.data";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {LoginService} from "./login.service";
import {Constants} from "../constants/constants.data";

@Component({
    templateUrl: 'app/login/login.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]

})

export class LoginComponent {

    constructor(private loginService:LoginService,
                private router:Router,
                private constants:Constants) {

    }

    model = new LoginData('', '');

    loginRequest() {
        this.loginService.postAndRedirect(this.model, this.router);

    }

}

