import {RouterConfig} from "@angular/router";
import {RunTestComponent} from "../user/runTest/runTest.component";
import {ShowTestsComponent} from "../user/ShowTests/showTests.component";
import {FinishTestPageComponent} from "./runTest/finish.page.component";

export const UserRoutes:RouterConfig = [
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
    }
];
