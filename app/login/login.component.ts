import {Component} from "@angular/core";
import {LoginData} from "./login.data";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {LoginService} from "./login.service";
import {Constants} from "../common/constants/constants.data";
import { NgForm }    from '@angular/forms';
import {MaterializeDirective} from "angular2-materialize/dist/index";
import {Http, Headers} from "@angular/http";
import {toPromise} from "rxjs/operator/toPromise";

@Component({
    templateUrl: 'app/login/login.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    providers: [LoginService]

})

export class LoginComponent {
    private loginUrl = '/login';


    constructor(private loginService:LoginService,
                private router:Router,
                private constants:Constants,
                private http:Http) {

    }
    errorData = {
        errorMessage :'',
        errorFlag : false
    };


    model = new LoginData('', false, '', false);

    public redirect(response, router) {
        console.log("response " + response);
        router.navigate(['/' + response]);
        //
    }


    
    errorMessage(): string{
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


    loginRequest() {
        this.model.submitAttempt = true;
        this.model.usernameValid = (this.model.username !== '' && this.model.password !== '');
        this.errorData.errorMessage = this.errorMessage();
        if(this.model.usernameValid) {
           
            this.loginService.postAndRedirect(this.model, this.router, this.errorData);

        }
        

    }

}

