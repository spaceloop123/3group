import {ChartsComponent} from "../charts/charts.component";
import {Component, OnInit} from "@angular/core";
import {CustomHttp} from "../../common/services/CustomHttp";
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: 'app/user/showTests.html',
    directives: [ChartsComponent]
})

export class ShowTestsComponent implements OnInit {

    constructor(private customHttp:CustomHttp,
                private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.customHttp.checkRole();

    }
}
