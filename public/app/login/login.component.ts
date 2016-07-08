import { Component } from '@angular/core';
import {LoginData} from "./login.data";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Constants} from "../constants/constants.data";


import { LoginService } from './login.service';
import {HomepageComponent} from "../homepage/homepage.component";
import {RouteConfig} from "@angular/router-deprecated";

@Component({
    templateUrl: 'app/login/login.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]

})

@RouteConfig([
    {path: '/homepage', name: 'Homepage', component: HomepageComponent, useAsDefault: true}
])

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

