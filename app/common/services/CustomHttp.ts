import 'rxjs/Rx';

import {Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";

@Injectable()
export class CustomHttp {

	constructor(
		private http: Http,
		private router: Router) {}

	request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(this.http.request(url, options));
	}

	get(url: string, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(this.http.get(url,options));
	}

	post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(this.http.post(url, JSON.stringify(body), this.prepareOptionsObject(options)));
	}

	put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(this.http.put(url, JSON.stringify(body), this.prepareOptionsObject(options)));
	}

	delete(url: string, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(this.http.delete(url, options));
	}

	wrap(observable: Observable<Response>): Observable<any> {
		return observable
			.catch(this.errorHandler.bind(this))
			.map( (response) => response );
	}

	prepareOptionsObject(options?: RequestOptionsArgs) : RequestOptionsArgs {
		options = options || new RequestOptions();
		options.headers = options.headers || new Headers();
		if(!options.headers.has('Content-Type')) {
			options.headers.append('Content-Type', 'application/json');
		}
		return options;
	}

	checkRole() {
			return this.wrap(this.get('/role'));
	}

	errorHandler(err): Observable<any> {
		var state = (('' + err.url).indexOf('/login') + 1) ? null : err.status;

		switch (state) {
			case 401:
				console.log('Hey, I\'m catching 401 !!!');
				this.router.navigate(['/login']);
				return Observable.empty();
			case 403:
				console.log('Hey, I\'m catching 403 !!!');
				this.router.navigate(['/home']);
				return Observable.empty();
			case 404:
				console.log('Hey, I\'m catching 404 !!!');
				this.router.navigate(['/error']);
				return Observable.empty();
			default:
				return Observable.throw(err);
		}

	}
}