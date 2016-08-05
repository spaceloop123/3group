import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";
import {MaterializeDirective} from 'angular2-materialize';

@Component({
    selector: 'datepicker',
    templateUrl: 'app/admin/actions/show-users/user-info/datepicker.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})
export class DatepickerComponent implements OnInit {

    private assignTestUrl = 'app/admin/assignTest';  // URL to web api
    @Input() state:string;
    @Output() notify:EventEmitter<string> = new EventEmitter<string>();
    @Output() toggleState:EventEmitter<string> = new EventEmitter<string>();


    constructor() {
    }

    ngOnInit():any {
        console.log('state = ' + this.state);
        if (this.state != 'date-picker-active') {
            this.enableAllInputFields();
            console.log('state = ' + this.state);
        } else {
            this.disableAllInputFields();
            console.log('rrr ' + this.state);
        }
    }

    enableAllInputFields() {
        document.getElementById("dateFrom").disabled = false;
        document.getElementById("hoursFrom").disabled = false;
        document.getElementById("minutesFrom").disabled = false;
        document.getElementById("dateTo").disabled = false;
        document.getElementById("hoursTo").disabled = false;
        document.getElementById("minutesTo").disabled = false;
    }


    disableAllInputFields() {
        document.getElementById("dateFrom").disabled = true;
        document.getElementById("hoursFrom").disabled = true;
        document.getElementById("minutesFrom").disabled = true;
        document.getElementById("dateTo").disabled = true;
        document.getElementById("hoursTo").disabled = true;
        document.getElementById("minutesTo").disabled = true;

    }

    data = {
        dateFrom: new Date(),
        dateTo: new Date()
    };

    confirmDate() {
        var a = document.getElementById("dateFrom");
        var b = document.getElementById("dateTo");
        if (!a.value || !b.value) {
        }

        this.data.dateFrom.setFullYear(parseInt(a.value.substr(0, 4)), parseInt(a.value.substr(5, 2)) - 1, parseInt(a.value.substr(8, 2)));
        this.data.dateFrom.setUTCHours(document.getElementById("hoursFrom").value);
        this.data.dateFrom.setUTCMinutes(document.getElementById("minutesFrom").value);

        this.data.dateTo.setFullYear(parseInt(b.value.substr(0, 4)), parseInt(b.value.substr(5, 2)) - 1, parseInt(b.value.substr(8, 2)));
        this.data.dateTo.setUTCHours(document.getElementById("hoursTo").value);
        this.data.dateTo.setUTCMinutes(document.getElementById("minutesTo").value);

        console.log('month-test', this.data.dateFrom);
        this.notify.emit(JSON.stringify(this.data));

        if (this.state !== 'date-picker-active') {
            this.state = 'date-picker-active';
           this.disableAllInputFields();
            this.toggleState.emit(this.state);
        } else {
            this.state = 'teacher-picker-active';
            this.enableAllInputFields();
            this.toggleState.emit(this.state);
        }

    }

}

