import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {CustomHttp} from "../services/CustomHttp";
import {AuthData} from "./auth.data";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthService {
	private _loading:Observable<AuthService>;

	private _email:string = null;
	private _username:string = null;
	private _role:string = null;

	constructor(private customHttp:CustomHttp,
	            private router:Router) {
		this.restore();
	}

	get isauth() {
		return !!this._role;
	}

	get username() {
		return this._username;
	}

	get role() {
		return this._role;
	}

	get email() {
		return this._email;
	}

	public logIn(loginData:AuthData, errHandler?:(err, data) => void) {
		var that = this;
		return this.customHttp
			.post("/login", loginData)
			.subscribe(
				res => {
					that.setData(res);
					that.updateRouteFromRole();
				},
				err => errHandler(err, loginData)
			);
	}

	public logOut() {
		let that = this;
		this.customHttp.get("/logout")
			.subscribe(
				() => {
					localStorage.clear();
					that.setData(null);
					that.updateRouteFromRole();
				}
			);
	}

	public updateRouteFromRole() {
		if (this._role) {
			this.router.navigate(['/' + this._role.toLowerCase()]);
		} else {
			this.router.navigate(['/login']);
		}
	}

	private restore() {
		let that = this,
			config = localStorage.getItem('auth');
		try {
			config = config && JSON.parse(config) || false;
		} catch (syntaxError) {
			config = null;
		}
		if (config) {
			this._loading = that.customHttp.get('/authinfo');
			this._loading.subscribe((info) => {
				that.setData(info);
				that._loading = null;
			}, ()=>{
				that._loading = null;
			});
		} else {
			this._loading = null;
		}
	}

	private setData(info) {
		info = info || {role: null, username: null};
		this._role = info.role;
		this._username = info.username;
		this._email = info.email;
		localStorage.setItem('auth', (!!this._role).toString());
	}

	public ready():Observable<AuthService> {
		let that = this;
		return this._loading ? this._loading.map(() => that) : Observable.of(this);
	}
}