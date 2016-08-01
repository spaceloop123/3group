import {DatepickerComponent} from "./datepicker.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {MaterializeDirective} from 'angular2-materialize';
import {Http, Headers} from "@angular/http";
import {LineChartDemoComponent} from "../../../../user/charts/charts.component";


@Component({

    templateUrl: 'app/admin/actions/show-users/user-info/assignTest.html',
    directives: [DatepickerComponent, LineChartDemoComponent, CHART_DIRECTIVES, ROUTER_DIRECTIVES, MaterializeDirective],

})

export class AssignTestComponent implements OnInit {

    onNotify(message:string):void {
       var field = <HTMLElement><any>document.getElementById("datepicker");
        if ((field.textContent === 'dd') || (field.textContent === 'mm') || (field.textContent === 'yyyy')) {
            console.log("Select Date");
        }
        else {
            console.log("OK");
        }
    }



    checkInput(event) {
        console.log("checkInput")

    }


    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private http:Http
           ) { }



    ngOnInit() {
        //TODO add customHttp.checkRole()
    }

}
