import {TeacherCheckingComponent} from "./teacher/teacher-checking.component";
import {provideRouter, RouterConfig} from "@angular/router";
import {TeacherComponent} from "./teacher/teacher.component";


const teacherRoutes:RouterConfig = [
    {
        path: 'logo',
        redirectTo: '/teacher',
        pathMatch: 'full'
    },
    {
        path: 'teacher',
        component: TeacherComponent
    },
    {
        path: 'teacher/check_test/:id',
        component: TeacherCheckingComponent
    }

];

export const TEACHER_ROUTER_PROVIDERS = [
    provideRouter(teacherRoutes)
];