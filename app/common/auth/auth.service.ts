import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {CustomHttp} from "../services/CustomHttp";
import {AuthData} from "./auth.data";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthService {
	private _loading: Observable<any>;
	private _role:string = null;

	constructor(private customHttp:CustomHttp,
	            private router:Router) {
		this.restore();
	}

	get role() {
		return this._role;
	}
	set role(role: string) {
		this._role = role;
		localStorage.setItem('auth', this._role);
	}

	public logIn(loginData:AuthData, errHandler?:(err, data) => void) {
		var that = this;
		return this.customHttp
			.post("/login", loginData)
			.subscribe(
				res => {
					that.role = res.role;
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
					that.role = null;
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
			config = localStorage.getItem('auth') || '';
		if(config) {
			this._loading = that.customHttp.get('/role');
		    this._loading.subscribe((role) =>{
				that._role = role || '';
				that._loading = null;
			}, ()=>{
				that._loading = null;
			});
		} else {
			this._loading = null;
		}
	}

	public ready(): Observable<AuthService> {
		let that = this;
		return this._loading ? this._loading.map(() => that) : Observable.of(this);
	}
}