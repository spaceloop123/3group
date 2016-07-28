import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {Http} from "@angular/http";
import {MaterializeDirective} from 'angular2-materialize';
import {ROUTER_DIRECTIVES} from "@angular/router";


@Component({
    selector: 'datepicker',
    templateUrl: 'app/admin/datepicker.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})
export class datepickerComponent {
    private assignTestUrl = 'app/admin/assignTest';  // URL to web api

    //lineChartData;

    constructor(private http:Http) {
        console.log('constructor: datePicker');
    }
}



/*handleError(error:any) {
 console.error('An error occurred', error);
 return Promise.reject(error.message || error);
 }*/








