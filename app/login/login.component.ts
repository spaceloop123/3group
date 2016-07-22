import {Component, OnInit} from "@angular/core";
import {LoginData} from "./login.data";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {LoginService} from "./login.service";
import {Constants} from "../common/constants/constants.data";
import {NgForm} from "@angular/forms";
import {Headers, Http} from "@angular/http";

@Component({
    templateUrl: 'app/login/login.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]

})

export class LoginComponent implements OnInit{

    ngOnInit():any {
        this.loginService.isAuthenticated(this.router);
    }

    constructor(private loginService:LoginService,
                private router:Router,
                private constants:Constants) {

    }

    model = new LoginData('', '');

    submitted = false;

    showFormControls(form:NgForm) {

        return form && form.controls['login'] &&
            form.controls['lognin'].value; // Dr. IQ
    }

    onSubmit() { this.submitted = true; }

    loginRequest() {
        this.loginService.logIn(this.model);
    }

}

