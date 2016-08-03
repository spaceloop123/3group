import {Component, EventEmitter, Output} from '@angular/core';
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


    dateFrom:any;
    dateTo:any;
    inputState:any;


    @Output() notify:EventEmitter<string> = new EventEmitter<string>();

    constructor(private http:Http,
                private router:Router) {
        this.dateFrom = new Date();


        // this.inputState = 'disabled-style';


        // this.selectedDateFrom.setDate(this.dateFrom);
        console.log("this.dateFrom", this.dateFrom)
    }


    /* var getDate = function(daysDelta) {
     var d = new Date();
     (d.setDate(d.getDate()+daysDelta));
     return  d;
     }
     console.log(getDate(1));
     */

    selectDateFrom() {
        if (this.dateFrom === '') {
            console.log("select Date");
        }
        else {
            console.log('this.dateFrom ' + this.dateFrom);
            /*if(this.dateFrom){
             this.inputState = 'visible-style';
             }*/
        }
    }


    selectDateTo() {
        if (this.dateTo === '') {
            console.log("select Date");
        }
        else {
            console.log('dateTo ' + this.dateTo);
        }
    }


    data = {
        dateTo: '',
        timeTo: '',
        dateFrom: '',
        timeFrom: ''
    };

    timeTo = {
        hours: '',
        minutes: '',
        am: ''
    };

    timeFrom = {
        hours: '',
        minutes: '',
        am: ''
    };


}

