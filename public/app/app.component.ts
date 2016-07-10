import {Component} from "@angular/core";
import {LoginComponent} from './login/login.component';
import {HomepageComponent} from './homepage/homepage.component';
import {HeaderComponent} from './header/header.component';
import {Page1Component} from './page1/page1.component';

import {ROUTER_DIRECTIVES} from '@angular/router';
import {LoginService} from "./login/login.service";

@Component({
    selector: 'my-app',
    template: `
<div class="page-flexbox-wrapper">
    <header>
        <nav class="black navbar-fixed" role="navigation">
            <div class="nav-wrapper container">
               <header-component></header-component>
           </div>
       </nav>
    </header>
    <main class="valign-wrapper">
        <router-outlet></router-outlet>
    </main>
    <footer class="page-footer" style="background-color: #000000">
       <div class="footer-copyright">
           <div class="container">
               Copyright Text
            </div>
        </div>
    </footer>
</div>
    `,
    directives: [HeaderComponent, ROUTER_DIRECTIVES],
    precompile: [LoginComponent, HomepageComponent, Page1Component],
    providers: [LoginService]
})

export class AppComponent {

}
