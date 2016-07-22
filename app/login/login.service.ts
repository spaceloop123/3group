import {Injectable} from "@angular/core";
import {CustomHttp} from "../common/services/CustomHttp";
import {LoginData}  from "./login.data";

@Injectable()
export class LoginService {
    private loginUrl = '/login';

    constructor(private http:CustomHttp) {

    }

    public redirect(response, router) {
        //console.log("response " + response);
        router.navigate(['/' + response]);
        //
    }

    public logIn(loginData:LoginData) {
        var that = this;
        this.http
            .post(this.loginUrl, loginData)
            .subscribe(
                res => location.reload(),
                err => that.handleError(err)
            );
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

    handleError(error) {
        console.error('An error occurred', error);
        //return Promise.reject(error.message || error);
    }
}