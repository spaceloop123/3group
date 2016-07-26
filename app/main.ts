import 'jquery'
import 'angular2-materialize';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {CustomHttp} from "./common/services/CustomHttp";
import {Constants} from './common/constants/constants.data';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {provideForms, disableDeprecatedForms} from "@angular/forms";
import {RouterManager} from "./common/services/RouterManager";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    RouterManager,
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
    }
]);

