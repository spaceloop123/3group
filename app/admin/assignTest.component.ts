import {datepickerComponent} from "./datepicker.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {LineChartDemoComponent} from "../user/charts.component";
import {CustomHttp} from "../common/services/CustomHttp";

@Component({
    templateUrl: 'app/admin/assignTest.html',
    directives: [datepickerComponent, LineChartDemoComponent, ROUTER_DIRECTIVES],
    providers: [CustomHttp]
})

export class assignTestComponent implements OnInit {

    constructor(
        private router:Router,
        private customHttp:CustomHttp
    ) { }

    ngOnInit() {
        //TODO add customHttp.checkRole()
    }

}
