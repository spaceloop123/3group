import {Injectable}    from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {LoginData} from './login.data';



@Injectable()
export class LoginService {


    private loginUrl = '/login';

    constructor(private http:Http) {

    }

    public redirect(response, router) {
        console.log('All good ' + response);
        if(router === undefined){
            console.log('Bad, bad, bad..');
        }
        else {
            router.navigate(['/homepage']);
        }
    }

    public postAndRedirect(loginData:LoginData, router) {
        var header = new Headers();
        var that = this;

        header.append('Content-Type', 'application/json');
        console.log(this.loginUrl, JSON.stringify(loginData), {headers: header});
        console.log(' json ' + JSON.stringify(loginData));
        console.log('url ' + this.loginUrl);


        this.http
            .post(this.loginUrl, JSON.stringify(loginData), {headers: header})
            .toPromise()
            .then(res => that.redirect(res.json().data, router))
            .catch(that.handleError);
    }


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}