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
    error = '';
    errorFlag = false;
    model = new LoginData('', false, '', false);

    submitted = false;

    public redirect(response, router) {
        console.log("response " + response);
        router.navigate(['/' + response]);
        //
    }

    public postAndRedirect() {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post('/login', JSON.stringify({username: that.model.username, password: that.model.password}),
                {headers: header})
            .toPromise()
            .then(res =>that.redirect(res.json().role, that.router), error =>(that.noAuthorized()));

    }

    showFormControls(form: NgForm) {

        return form && form.controls['login'] &&
            form.controls['lognin'].value; // Dr. IQ
    }

    onSubmit() { this.submitted = true; }
    
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

    noAuthorized(){
        this.errorFlag = true;
        this.error = 'incorect user name or password';
    }

    loginRequest() {
        this.model.submitAttempt = true;
        this.model.usernameValid = (this.model.username !== '' && this.model.password !== '');
        this.error = this.errorMessage();
        if(this.model.usernameValid) {
           
           // this.loginService.postAndRedirect(this.model, this.router, this.error, this.errorFlag);
            this.postAndRedirect();
        }
        

    }

}

