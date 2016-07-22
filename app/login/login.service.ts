import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {LoginData} from "./login.data";

@Injectable()
export class LoginService {


    private loginUrl = '/login';

    constructor(private http:Http) {

    }

    public redirect(response, router) {
        console.log("response " + response);
        router.navigate(['/' + response]);
        //
    }
    noAuthorized(errorData){
        errorData.errorFlag = true;
        errorData.errorMessage = 'incorrect user name or password';
                
    }

    public postAndRedirect(loginData:LoginData, router, errorData) {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post(this.loginUrl, JSON.stringify(loginData), {headers: header})
            .toPromise()
            .then(res =>that.redirect(res.json().role, router), error =>(that.noAuthorized(errorData)));

    }



}