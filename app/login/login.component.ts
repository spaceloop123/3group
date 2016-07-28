import {Component, OnInit} from "@angular/core";
import {LoginData} from "./login.data";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {LoginService} from "./login.service";
import {Constants} from "../common/constants/constants.data";
import {toast} from "angular2-materialize";

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

    errorMessage :string = ''





    model = new LoginData('', false, '', false);

    getErrorMessage(): string{
        var nameIsEmpty = false;
        var message = 'Please enter '
        if(this.model.username == ''){
            message += 'your login';
            nameIsEmpty = true;
        }
        if(this.model.password == ''){
            if(nameIsEmpty){
                message += ' and ';
            }
            message += 'your password';
        }
        return message;
    }

    onSubmit() {
        console.log('onSubmit');
    }

    loginRequest() {
        this.model.submitAttempt = true;
        this.errorMessage = (this.model.username !== '' && this.model.password !== '') ? '' : this.getErrorMessage();
        if(this.errorMessage.length !== 0) {
            toast(this.errorMessage, 3000, 'amber darken-2');
        }
        console.log('loginRequest');
        if(this.errorMessage === '') {
            this.loginService.logIn(this.model);
        }
    }

}
