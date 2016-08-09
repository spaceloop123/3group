import {Component, EventEmitter, Output, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";

@Component({
    selector: 'datepicker',
    templateUrl: 'app/admin/actions/show-users/user-info/datepicker.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})
export class DatepickerComponent implements OnInit {

    private assignTestUrl = 'app/admin/assignTest';
    @Output() notify:EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit():any {
        this.enableAllInputFields();
    }

    enableAllInputFields() {
        $('#dateFrom').prop('disabled', false);
        $('#hoursFrom').prop('disabled', false);
        $('#minutesFrom').prop('disabled', false);
        $('#dateTo').prop('disabled', false);
        $('#hoursTo').prop('disabled', false);
        $('#minutesTo').prop('disabled', false);
    }


    disableAllInputFields() {
        $('#dateFrom').prop('disabled', true);
        $('#hoursFrom').prop('disabled', true);
        $('#minutesFrom').prop('disabled', true);
        $('#dateTo').prop('disabled', true);
        $('#hoursTo').prop('disabled', true);
        $('#minutesTo').prop('disabled', true);
    }

    data = {
        dateFrom: new Date(),
        dateTo: new Date()
    };

    confirmDate() {
        var a = $('#dateFrom').val();
        var b = $('#dateTo').val();
        if (a && b) {

            this.data.dateFrom.setFullYear(parseInt(a.substr(0, 4)), parseInt(a.substr(5, 2)) - 1, parseInt(a.substr(8, 2)));
            this.data.dateFrom.setUTCHours($('#hoursFrom').val());
            this.data.dateFrom.setUTCMinutes($('#minutesFrom').val());

            this.data.dateTo.setFullYear(parseInt(b.substr(0, 4)), parseInt(b.substr(5, 2)) - 1, parseInt(b.substr(8, 2)));
            this.data.dateTo.setUTCHours($('#hoursTo').val());
            this.data.dateTo.setUTCMinutes($('#minutesTo').val());

            console.log('month-test', this.data.dateFrom);
            this.notify.emit(JSON.stringify(this.data));
        }
        else {
            console.log("select date")
        }

    }
}