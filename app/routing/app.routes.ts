import {RouterConfig} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {RunTestComponent} from "../user/runTest/runTest.component";
import {FinishTestPageComponent} from "../user/runTest/finish.page.component";
import {ShowTestsComponent} from "../user/ShowTests/showTests.component";

import {UserComponent} from "../user/user.component";
import {ChartsComponent} from "../user/charts/charts.component";
import {TeacherComponent} from "../teacher/teacher.component";
import {TeacherCheckingComponent} from "../teacher/teacher-checking.component";
import {AdminComponent} from "../admin/admin.component";
import {AuthGuard} from "../common/auth/auth.guard";
import {TeacherInfoComponent} from "../admin/actions/show-users/teacher-info/teacher-info.component";
import {AuthErrorComponent} from "../common/auth/error/auth.error.component";
import {AssignTestComponent} from "../admin/actions/show-users/user-info/assign-test.component";
import {GuestInfoComponent} from "../admin/actions/show-users/guest-info/guest-info.component";

function wrapSecured(config: RouterConfig, role: string) {
    config.forEach((route)=> {
       route.data = {role: role};
       route.canActivate = [AuthGuard];
    });
    return config;
}

export const DEFAULT_ROUTES: RouterConfig = [
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
        path: 'runTest/:role',
        component: RunTestComponent
    },
    {
        path: 'finishTest/:role',
        component: FinishTestPageComponent
    },
    {
        path: 'showTests',
        component: ShowTestsComponent
    },

    {
        path: 'error/:code',
        component: AuthErrorComponent
    }
];

export const USER_ROUTES: RouterConfig = [
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'user/charts',
        component: ChartsComponent
    }
];

export const TEACHER_ROUTES: RouterConfig = [
    {
        path: 'teacher',
        component: TeacherComponent
    },
    {
        path: 'teacher/check_test/:id',
        component: TeacherCheckingComponent
    }
];

export const ADMIN_CONFIG: RouterConfig = [
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'admin/assign_test/:id',
        component: AssignTestComponent
    },
    {
        path: 'admin/teacher_info/:id',
        component: TeacherInfoComponent
    },
    {
        path: 'admin/guest_info/:id',
        component: GuestInfoComponent
    }
];

export const ROUTES: RouterConfig = [
    ...DEFAULT_ROUTES,
    ...wrapSecured(USER_ROUTES, 'user'),
    ...wrapSecured(TEACHER_ROUTES, 'teacher'),
    ...wrapSecured(ADMIN_CONFIG, 'admin')
];