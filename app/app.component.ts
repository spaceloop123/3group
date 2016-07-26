import {Component, OnInit, OnDestroy} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./common/header/header.component";
import {ROUTER_DIRECTIVES, NavigationEnd, Router, NavigationError} from "@angular/router";
import {LoginService} from "./login/login.service";
import {RunTestComponent} from "./user/runTest/runTest.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {FinishTestPageComponent} from "./user/runTest/finish.page.component";
import {TeacherCheckingComponent} from "./teacher/teacher-checking.component";
import {ChartsComponent} from "./user/charts/charts.component";
import {ShowTestsComponent} from "./user/ShowTests/showTests.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, HeaderComponent],
    precompile: [LoginComponent, UserComponent, AdminComponent, TeacherComponent,
        RunTestComponent, FinishTestPageComponent, TeacherCheckingComponent, ChartsComponent, ShowTestsComponent],
    providers: [LoginService, Location]
})

export class AppComponent implements OnInit, OnDestroy {

    private sub;
    private pathname;

    constructor(private router: Router) {}

    checkPath () {
        this.pathname = window.location.href;
        return (this.pathname.indexOf("/login") !== -1);
    }

    RoutesErrorHandler() {
        this.sub = this.router.events.subscribe(event => {
            if(event instanceof NavigationError) {
                console.log('Handled that!');
                this.router.navigate(['/login']);
            }
        });
    }

    ngOnInit () {
        this.checkPath();
        this.RoutesErrorHandler();
        this.sub = this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.checkPath();
            }
        });
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

}
