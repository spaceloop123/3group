import {DatepickerComponent} from "./datepicker.component";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {MaterializeDirective} from "angular2-materialize";
import {ChartsComponent} from "../../../../user/charts/charts.component";
import {CustomHttp} from "../../../../common/services/CustomHttp";


@Component({

    templateUrl: 'app/admin/actions/show-users/user-info/assignTest.html',
    directives: [DatepickerComponent, ChartsComponent, CHART_DIRECTIVES, ROUTER_DIRECTIVES, MaterializeDirective],

})

export class AssignTestComponent implements OnInit {

    public currentUser:any;
    private sub;

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


    constructor(private route:ActivatedRoute,
                private customHttp:CustomHttp) {
    }

    ngOnInit() {
        console.log('hui');
        this.customHttp.checkRole();
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.currentUser = params['id'];
            console.log('that.currentUser ' + that.currentUser);
        });
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

}
