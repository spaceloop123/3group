import {Component} from "@angular/core";
import {LoginFormComponent} from './login/login-form.component';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    directives: [LoginFormComponent]
})

export class AppComponent {

}
