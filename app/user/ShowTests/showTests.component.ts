import {LineChartDemoComponent} from "../charts/charts.component";
import {Component, OnInit} from "@angular/core";
import {CustomHttp} from "../../common/services/CustomHttp";

@Component({
    templateUrl: 'app/user/showTests.html',
    directives: [LineChartDemoComponent]
})

export class ShowTestsComponent implements OnInit {

    constructor(private customHttp: CustomHttp) { }

    ngOnInit() {
        this.customHttp.checkRole();
    }
}
