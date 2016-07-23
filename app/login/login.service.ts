import {Injectable} from "@angular/core";
import {CustomHttp} from "../common/services/CustomHttp";
import {LoginData}  from "./login.data";

@Injectable()
export class LoginService {
    private loginUrl = '/login';

    constructor(private customHttp:CustomHttp) {

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
                res => location.reload(),
                err => that.handleError(err)
            );
    }

    public logOut(router) {
        this.customHttp
            .get("/logout")
            .subscribe(
                res => {
                    if (res.json().status === "deleted") {
                        location.reload()
                    } else {
                        console.log(":(");
                    }
                },
                err => this.handleError(err)
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
                err => this.handleError(err)
            );
    }

    handleError(error) {
        console.error('An error occurred', error);
        //return Promise.reject(error.message || error);
    }
}