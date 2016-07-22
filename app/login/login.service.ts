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
        //console.log("response " + response);
        router.navigate(['/' + response]);
        //
    }

    public logIn(loginData:LoginData) {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post(this.loginUrl, JSON.stringify(loginData), {headers: header})
            .toPromise()
            .then(res => {
                // console.log("POST in login service: res = " + res.json().role);
                location.reload();
            }, error =>console.log(error))
            .catch(that.handleError);
    }

    public isAuthenticated(router) {
        this.http
            .get("/is_authenticated")
            .toPromise()
            .then(res => {
                if (res.json()) {
                    router.navigate(['/home']);
                } else {
                    console.log(":(");
                }
            }, error =>console.log(error))
            .catch(this.handleError);
    }

    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    //.get("")
}