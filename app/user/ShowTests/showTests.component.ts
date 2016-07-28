
import {LineChartDemoComponent} from "../charts.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'app/user/showTests.html',
    directives: [LineChartDemoComponent]
})

export class ShowTestsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        //TODO add customHttp.checkRole()
    }
}
