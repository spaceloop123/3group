import {RouterConfig} from "@angular/router";
import {RunTestComponent} from "../user/runTest/runTest.component";
import {ShowTestsComponent} from "../user/ShowTests/showTests.component";

export const UserRoutes:RouterConfig = [
    {
        path: 'runTest',
        component: RunTestComponent
    },
    {
        path: 'showTests',
        component: ShowTestsComponent
    }
];