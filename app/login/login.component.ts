import {Component, OnInit} from "@angular/core";
import {LoginData} from "./login.data";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Constants} from "../common/constants/constants.data";
import {toast} from "angular2-materialize";
import {AuthService} from "../common/auth/auth.service";

@Component({
    templateUrl: 'app/login/login.html',
    directives: [ROUTER_DIRECTIVES]

})

export class LoginComponent implements OnInit{

    errorMessage:string = '';
    model = new LoginData('', false, '', false);

    constructor(private authService:AuthService,
                private constants:Constants) {
    }

    ngOnInit():any {
        this.authService.ready().subscribe(svc => svc.updateRouteFromRole());
    }

    getErrorMessage(): string{
        let nameIsEmpty = false;
        let message = 'Please enter ';
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
        let that = this;
        this.model.submitAttempt = true;
        this.errorMessage = (this.model.username !== '' && this.model.password !== '') ? '' : this.getErrorMessage();
        if(this.errorMessage.length !== 0) {
            toast(this.errorMessage, 3000, 'amber darken-2');
        }
        console.log('loginRequest');
        if (this.errorMessage === '') {
            this.authService.logIn(this.model, err => {
                toast('Please enter correct login and password', 3000, 'red darken-2');
                if (that.model !== null) {
                    that.model.clearForm();
                }
            });
        }
    }

}
