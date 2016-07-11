import {Component} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {HeaderComponent} from "./header/header.component";
import {Page1Component} from "./page1/page1.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {LoginService} from "./login/login.service";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [HeaderComponent, ROUTER_DIRECTIVES],
    precompile: [LoginComponent, HomepageComponent, Page1Component],
    providers: [LoginService]
})

export class AppComponent {

}
