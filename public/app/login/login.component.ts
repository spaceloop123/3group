import { Component } from '@angular/core';
import {LoginData} from "./login.data";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import { LoginService } from './login.service';

@Component({
    templateUrl: 'app/login/login.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]

})

export class LoginComponent{

    constructor(
        private loginService: LoginService,
        private router: Router){

    }

    model = new LoginData('', '');
    loginRequest() {
        this.loginService.postAndRedirect(this.model, this.router);

    }

}

