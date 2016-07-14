import {Component} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {HeaderComponent} from "./common/header/header.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {LoginService} from "./login/login.service";
import {RunTestComponent} from "./user/runTest/runTest.component";
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
import {TeacherComponent} from "./teacher/teacher.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [HeaderComponent, ROUTER_DIRECTIVES],
    precompile: [LoginComponent, RunTestComponent, UserComponent, AdminComponent, TeacherComponent],
    providers: [LoginService]
})

export class AppComponent {

}

