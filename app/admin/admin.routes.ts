import {RouterConfig} from "@angular/router";
import {assignTestComponent} from "../admin/assignTest.component";

export const AdminRoutes:RouterConfig = [
    {
        path: 'assignTest',
        component: assignTestComponent
    }
];