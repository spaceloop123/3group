import {provideRouter, RouterConfig} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {ChartsComponent} from "./user/charts/charts.component";
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
        path: 'teacher/check_test/:id',
        component: TeacherCheckingComponent
    },
    {
        path: 'user/charts',
        component: ChartsComponent
    },
    ...HomepageRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];