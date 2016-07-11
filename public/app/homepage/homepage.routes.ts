import {  RouterConfig } from '@angular/router';
import {RunTestComponent} from "../runTest/runTest.component";
import {ShowTestsComponent} from "../ShowTests/showTests.component";

export const HomepageRoutes: RouterConfig = [
    {
        path: 'runTest',
        component: RunTestComponent
    },
    {
        path: 'showTests',
        component: ShowTestsComponent
    }
];
