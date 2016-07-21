import {Injectable} from "@angular/core";
import {CustomHttp} from "../common/services/CustomHttp";
import {LoginData}  from "./login.data";

@Injectable()
export class LoginService {
    private loginUrl = '/login';

    constructor(private http: CustomHttp) {
    }

    public postAndRedirect(loginData:LoginData, router) {
        var that = this;
        this.http
            .post(this.loginUrl, loginData)
            .subscribe(
                res =>that.redirect(res.role, router),
                err =>that.handleError(err)
            );
    }

    public redirect(response, router) {
        console.log("response " + response);
        router.navigate(['/' + response]);
    }

    handleError(error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}