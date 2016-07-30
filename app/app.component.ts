import {Component, OnInit, OnDestroy} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./common/header/header.component";
import {ROUTER_DIRECTIVES, Router, NavigationError} from "@angular/router";
import {RunTestComponent} from "./user/runTest/runTest.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {FinishTestPageComponent} from "./user/runTest/finish.page.component";
import {TeacherCheckingComponent} from "./teacher/teacher-checking.component";
import {ChartsComponent} from "./user/charts/charts.component";
import {ShowTestsComponent} from "./user/ShowTests/showTests.component";
import {Constants} from "./common/constants/constants.data";
import {AuthService} from "./common/auth/auth.service";
import {Subscription} from "rxjs/Rx";

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	directives: [ROUTER_DIRECTIVES, HeaderComponent],
	precompile: [
		LoginComponent,
		UserComponent,
		AdminComponent,
		TeacherComponent,
		RunTestComponent,
		FinishTestPageComponent,
		TeacherCheckingComponent,
		ChartsComponent,
		ShowTestsComponent
	],
	providers: [Location]
})

export class AppComponent implements OnInit, OnDestroy {
	private routieChangeSubscription:Subscription;

	constructor(private authService:AuthService,
	            private router:Router,
	            private constants:Constants) {
	}

	checkPath():boolean {
		let pathname = window.location.href;
		return (pathname.indexOf("/login") !== -1) ||
			((this.authService.role === 'user') && (pathname.indexOf("/home") !== -1)) ||
			((this.authService.role === 'teacher') && (pathname.indexOf("/home") !== -1));
	}

	ngOnInit():any {
		this.routieChangeSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationError) {
				console.log('Handled that!');
				this.router.navigate(['/login']);
			}
		});
	}

	ngOnDestroy():any {
		this.routieChangeSubscription.unsubscribe();
	}
}
