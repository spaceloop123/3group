import {Component, EventEmitter, Output} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";
import {MaterializeDirective} from 'angular2-materialize';




@Component({
    selector: 'datepicker',
    templateUrl: 'app/admin/datepicker.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})
export class DatepickerComponent {
    private assignTestUrl = 'app/admin/assignTest';  // URL to web api



    dateFrom: any;
    dateTo: any;



    username: any;

    toUpperCase () {
        //this.username = parseInt(this.username, 10);
    }
    toLowerCase () {
        this.username = this.username.toLowerCase();
    }



    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    selectDateFrom() {
        //this.notify.emit('Click from nested component');
        var a = document.getElementById("dateFrom");
        if (a.value === '') {
            console.log("select Date");
        }
        else {
            console.log('a=', a.value);
        }
    }


    selectDateTo() {
        //this.notify.emit('Click from nested component');
        var b = document.getElementById("dateTo");
        if (b.value === '') {
            console.log("select Date");
        }
        else {
            console.log('b=', b.value);
        }
    }

    //lineChartData;

    constructor(private http:Http,
                private router:Router) {

    }
}