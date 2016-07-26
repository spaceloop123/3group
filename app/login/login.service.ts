import {Injectable} from "@angular/core";
import {CustomHttp} from "../common/services/CustomHttp";
import {LoginData}  from "./login.data";
import {toast} from 'angular2-materialize'
import {Constants} from '../common/constants/constants.data'

@Injectable()
export class LoginService {
    private loginUrl = '/login';

    constructor(private customHttp:CustomHttp,
                private constants: Constants) {

    }

    public redirect(response, router) {
        //console.log("response " + response);
        router.navigate(['/' + response]);
        //
    }

    public logIn(loginData:LoginData) {
        var that = this;
        this.customHttp
            .post(this.loginUrl, loginData)
            .subscribe(
                res => {
                    sessionStorage.setItem('role', res.json().role);
                    location.reload();
                },
                err => that.handleError(err, loginData)
            );
    }

    public logOut(router) {
        this.customHttp
            .get("/logout")
            .subscribe(
                res => {
                    console.log(res);
                    if (res.status ===200) {
                        location.reload()
                    } else {
                        console.log(":(");
                    }
                },
                err => this.handleError(err.status, null)
            );
    }

    public isAuthenticated(router) {
        this.customHttp
            .get("/is_authenticated")
            .subscribe(
                res => {
                    if (res.json()) {
                        router.navigate(['/home']);
                    } else {
                        console.log(":(");
                    }
                },
                err => this.handleError(err, null)
            );
    }

    handleError(error, loginData) {
        //console.error('An error occurred', error);
        toast('Please, enter correct login and password', 3000, 'red darken-2');
        if(loginData !== 'null'){
            loginData.clearForm();
        }
        //return Promise.reject(error.message || error);
    }
}