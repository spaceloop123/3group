//angular
import {Component, OnInit, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES, NavigationEnd, Router, NavigationError} from "@angular/router";

//components
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./common/header/header.component";
import {RunTestComponent} from "./user/runTest/runTest.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {FinishTestPageComponent} from "./user/runTest/finish.page.component";
import {TeacherCheckingComponent} from "./teacher/teacher-checking.component";
import {LineChartDemoComponent} from "./user/charts/charts.component";
import {ShowTestsComponent} from "./user/ShowTests/showTests.component";
import {AssignTestComponent} from "./admin/actions/show-users/user-info/assignTest.component";
import {DatepickerComponent} from "./admin/actions/show-users/user-info/datepicker.component";
import {ShowUsersComponent} from "./admin/actions/show-users/show-users.component";

//others
import {LoginService} from "./login/login.service";
import {Constants} from "./common/constants/constants.data";


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, HeaderComponent],
    precompile: [LoginComponent, UserComponent, AdminComponent, TeacherComponent, AssignTestComponent, DatepickerComponent,
        RunTestComponent, FinishTestPageComponent, TeacherCheckingComponent,LineChartDemoComponent, ShowTestsComponent, ShowUsersComponent],
    providers: [LoginService, Location]
})

export class AppComponent implements OnInit, OnDestroy {

    private sub;
    private pathname;
    private role;

    constructor(private router: Router,
                private constants:Constants) {}

    checkPath () {
        this.pathname = window.location.href;
        return ((this.pathname.indexOf("/login") !== -1) ||
        ((this.role === 'user') && (this.pathname.indexOf("/home") !== -1)) ||
        ((this.role === 'teacher') && (this.pathname.indexOf("/home") !== -1)));
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
        this.role = sessionStorage.getItem('role');
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
