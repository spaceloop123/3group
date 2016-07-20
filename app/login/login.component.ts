import {Component} from "@angular/core";
import {LoginData} from "./login.data";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {LoginService} from "./login.service";
import {Constants} from "../common/constants/constants.data";
import { NgForm }    from '@angular/forms';
import {MaterializeDirective} from "angular2-materialize/dist/index";

@Component({
    templateUrl: 'app/login/login.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [LoginService]

})

export class LoginComponent {

    constructor(private loginService:LoginService,
                private router:Router,
                private constants:Constants) {

    }

    model = new LoginData('', '', false);

    submitted = false;

    showFormControls(form: NgForm) {

        return form && form.controls['login'] &&
            form.controls['lognin'].value; // Dr. IQ
    }

    onSubmit() { this.submitted = true; }

    loginRequest() {
        this.model.submitAttempt = true;
        this.model.usernameValid = this.model.username !== '';
        this.loginService.postAndRedirect(this.model, this.router);

    }

}

