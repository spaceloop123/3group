import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";
import {Constants} from "../app/constants/constants.data";
import {HTTP_PROVIDERS} from "@angular/http";

bootstrap(AppComponent, [Constants, HTTP_PROVIDERS]);