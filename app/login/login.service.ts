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
        console.log("respose " + response);
        router.navigate(['/' + response]);
        //
    }

    public postAndRedirect(loginData:LoginData, router) {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post(this.loginUrl, JSON.stringify(loginData), {headers: header})
            .toPromise()
            .then(res =>that.redirect(res.json().role, router), error =>console.log(error))
            .catch(that.handleError);
    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}