import {DatepickerComponent} from "./datepicker.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {LineChartDemoComponent} from "../user/charts.component";
import {MaterializeDirective} from 'angular2-materialize';
import {Http, Headers} from "@angular/http";
//import {CustomHttp} from "../common/services/CustomHttp";

@Component({

    templateUrl: 'app/admin/assignTest.html',
    directives: [DatepickerComponent, LineChartDemoComponent, ROUTER_DIRECTIVES, MaterializeDirective],
    //providers: [CustomHttp]
})

export class AssignTestComponent implements OnInit {

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private http:Http
        //private customHttp:CustomHttp
    ) { }

    ngOnInit() {
        //TODO add customHttp.checkRole()
    }

}
