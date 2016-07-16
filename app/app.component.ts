import {Component} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {TeacherCheckingComponent} from "./teacher/teacher-checking.component";
import {ChartsComponent} from "./user/charts/charts.component";
import {HeaderComponent} from "./common/header/header.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {LoginService} from "./login/login.service";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [HeaderComponent, ROUTER_DIRECTIVES],
    precompile: [LoginComponent, HomepageComponent, TeacherCheckingComponent, ChartsComponent],
    providers: [LoginService]
})

export class AppComponent {

}
