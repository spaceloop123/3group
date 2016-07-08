import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {LoginData} from "./login.data";
//import any = jasmine.any;

@Injectable()
export class LoginService {

    private loginUrl = '/login';

    constructor(private http:Http) {
    }

    public post(loginData:LoginData):Promise <LoginData> {
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        console.log(this.loginUrl, JSON.stringify(loginData), {headers: header});

        return this.http
            .post(this.loginUrl, JSON.stringify(loginData), {headers: header})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}