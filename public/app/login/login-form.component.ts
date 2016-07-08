import {Component} from "@angular/core";
import {LoginData} from "./login.data";
import {LoginService} from "./login.service";
import {Constants} from "../constants/constants.data";

@Component({
    selector: 'login-form',
    templateUrl: './app/login/login-form.component.html',
    providers: [LoginService]
})

export class LoginFormComponent {
    constructor(private constants:Constants,
                private loginService:LoginService) {
    }

    submitted = false;

    onSubmit() {
        this.submitted = true;
    }

    model = new LoginData('', '');

    active = true;

    loginRequest() {
        this.loginService.post(this.model);
    }
}