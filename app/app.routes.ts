import {TeacherCheckingComponent} from './teacher/teacher-checking.component';
import {provideRouter, RouterConfig} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {UserRoutes} from "./user/user.routes";
import {ChartsComponent} from "./user/charts/charts.component";
import {AuthErrorComponent} from "./common/auth/auth.error.component";


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
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'teacher',
        component: TeacherComponent
    },
    {
        path: 'teacher/check_test/:id',
        component: TeacherCheckingComponent
    },
    {
        path: 'user/charts',
        component: ChartsComponent
    },
    {
        path: 'error/:code',
        component: AuthErrorComponent
    },
    ...UserRoutes

];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];