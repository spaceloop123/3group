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

    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    onClick() {
        this.notify.emit('Click from nested component');
    }

    //lineChartData;

    constructor(private http:Http,
                private router:Router) {

            }
}



/*handleError(error:any) {
 console.error('An error occurred', error);
 return Promise.reject(error.message || error);
 }*/








