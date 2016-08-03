import {DatepickerComponent} from "./datepicker.component";
import {Component, OnInit, Input} from "@angular/core";
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




    constructor(private route:ActivatedRoute,
                private customHttp:CustomHttp) {

       // this.dateTo = new Date();

    }



    public currentUser:any;
    private sub;

    onNotify():void {
        alert('onNotify')
        console.log('this.date.value');
        if(a.value!='' && b.value!=''){
            alert("alreadySelected")

        }
        }



    checkInput(event) {
        console.log("checkInput");


    }




    ngOnInit() {
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
