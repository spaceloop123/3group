import {Component, EventEmitter, Output, onInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";
import {MaterializeDirective} from 'angular2-materialize';




@Component({
    selector: 'datepicker',
    templateUrl: 'app/admin/actions/show-users/user-info/datepicker.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})
export class DatepickerComponent {
    private assignTestUrl = 'app/admin/assignTest';  // URL to web api

    constructor(private http:Http,
                private router:Router) {
        this.date = new Date();
    }

    dateFrom: any;
    dateTo: any;


   @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    /*onInit() {
        var a = document.getElementById("dateFrom");
        console.log('date', this.date.value);
        //a.value==this.date.value;
       // console.log('a=', a.value);

    }
*/

    selectDateFrom() {
        var a = document.getElementById("dateFrom");
        this.notify.emit('Click from nested component');
        if (a.value === '') {
            console.log("select Date");
        }
        else {
            console.log('a=', a.value);
        }
        console.log('date', this.date.value);
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


}

