import 'jquery'
import 'angular2-materialize';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {Constants} from './common/constants/constants.data';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {APP_ROUTER_PROVIDERS} from './app.routes';


bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    Constants,
    {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }
]);
