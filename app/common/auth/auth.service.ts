import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

    private pageRole;

    constructor(private http:Http,
                private router:Router) {}

    checkAuth() {

        var that = this;
        this.http.get('/role')
            .toPromise()
            .then(response => that.pageRole(response.json()))
            .catch( that.handleError.bind(that));
    }

    handleError(error:any) {
        this.router.navigate(['/error', error.code]);
    }

}