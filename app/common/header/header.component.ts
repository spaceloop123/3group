import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
	selector: 'header-component',
	templateUrl: '../app/common/header/header.html',
	directives: [ROUTER_DIRECTIVES]
})

export class HeaderComponent {
	auth:AuthService;

	constructor(private authService:AuthService) {
		this.auth = authService;
	}
}