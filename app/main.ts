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
    // TODO: (pay attention) Here is declared global services and thay must declares only here, don't add it to
    // TODO: provide option of @Component because in such way another instance of this services appearing, so it may
    // TODO: caused so much troubles with DependencyInjector
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

