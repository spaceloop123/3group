import 'rxjs/Rx';

import {Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";

@Injectable()
export class CustomHttp extends Http {

	constructor(
		backend: ConnectionBackend,
		defaultOptions: RequestOptions,
		private router: Router) {
		super(backend, defaultOptions);
	}

	request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(super.request(url, options));
	}

	get(url: string, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(super.get(url,options));
	}

	post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(super.post(url, JSON.stringify(body), this.prepareOptionsObject(options)));
	}

	put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(super.put(url, JSON.stringify(body), this.prepareOptionsObject(options)));
	}

	delete(url: string, options?: RequestOptionsArgs): Observable<any> {
		return this.wrap(super.delete(url, options));
	}

	wrap(observable: Observable<Response>): Observable<any> {
		return observable
			.map( (response) => response.json() )
			.catch(this.errorHandler);
	}

	prepareOptionsObject(options?: RequestOptionsArgs) : RequestOptionsArgs {
		options = options || new RequestOptions();
		options.headers = options.headers || new Headers();
		if(!options.headers.has('Content-Type')) {
			options.headers.append('Content-Type', 'application/json');
		}
		return options;
	}

	errorHandler(err): Observable<any> {
		if ([401, 403].indexOf(err.status) + 1 && !(('' + err.url).indexOf('/login') + 1)) {
			console.log('Hey, I\'m catching an asked request status !!!');
			this.router.navigate(['/login']);
			return Observable.empty();
		} else {
			return Observable.throw(err);
		}
	}
}