import {provideRouter, RouterConfig} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {TeacherCheckingComponent} from './teacher/teacher-checking.component';
import {HomepageRoutes} from "./homepage/homepage.routes";


const routes:RouterConfig = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logo',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'homepage/:status',
        component: HomepageComponent
    },
    {
        path: 'check_test',
        component: TeacherCheckingComponent
    },
    ...HomepageRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];