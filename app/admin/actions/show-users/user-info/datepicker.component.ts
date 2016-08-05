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

    inputState:any;

    @Output() notify:EventEmitter<string> = new EventEmitter<string>();

    constructor(private http:Http,
                private router:Router) {
    }

    data = {
        dateFrom: new Date(),
        dateTo: new Date()
    };

    selectDateFrom() {
        var a = document.getElementById("dateFrom");
        var b = document.getElementById("dateTo");
        if (!a.value || !b.value) {
console.log("select date")
        }

        this.data.dateFrom.setFullYear(parseInt(a.value.substr(0, 4)), parseInt(a.value.substr(5, 2)) - 1, parseInt(a.value.substr(8, 2)));
        this.data.dateFrom.setUTCHours(document.getElementById("hoursFrom").value);
        this.data.dateFrom.setUTCMinutes(document.getElementById("minutesFrom").value);


        this.data.dateTo.setFullYear(parseInt(b.value.substr(0, 4)), parseInt(b.value.substr(5, 2)) - 1, parseInt(b.value.substr(8, 2)));
        this.data.dateTo.setUTCHours(document.getElementById("hoursTo").value);
        this.data.dateTo.setUTCMinutes(document.getElementById("minutesTo").value);

        this.notify.emit(JSON.stringify(this.data));
    }
}

