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
    noAuthorized(message, errorFlag){
        errorFlag = true;
        message = 'incorect user name or password';
                
    }

    public postAndRedirect(loginData:LoginData, router, message, errorFlag) {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post(this.loginUrl, JSON.stringify(loginData), {headers: header})
            .toPromise()
            .then(res =>that.redirect(res.json().role, router), error =>(that.noAuthorized(message, errorFlag)));

    }



}