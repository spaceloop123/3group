import 'rxjs/Rx';
import 'jquery'
import 'angular2-materialize';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {CustomHttp} from "./common/services/CustomHttp";
import {Constants} from './common/constants/constants.data';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, provideRouter} from '@angular/router';
import {provideForms, disableDeprecatedForms} from "@angular/forms";
import {ROUTES} from "./routing/app.routes";
import {AuthService} from "./common/auth/auth.service";
import {AuthGuard} from "./common/auth/auth.guard";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provideRouter(ROUTES),
    ROUTER_DIRECTIVES,
    disableDeprecatedForms(),
    provideForms(),
    Constants,
    {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    },
    {
        provide: CustomHttp,
        useClass: CustomHttp,
        deps: [Http, Router]
    },
    {
        provide: AuthService,
        useClass: AuthService,
        deps: [CustomHttp, Router]
    },
    {
        provide: AuthGuard,
        useClass: AuthGuard,
        deps: [AuthService]
    }
]);

