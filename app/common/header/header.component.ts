import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
	selector: 'header-component',
	templateUrl: '../app/common/header/header.html',
	directives: [ROUTER_DIRECTIVES]
})

export class HeaderComponent {

	constructor(private authService:AuthService) {
	}

	checkLogin() {
		return ( window.location.href.indexOf("/login") !== -1);
	}

	goAway() {
		this.authService.logOut();
	}
}