import {Component, EventEmitter, Output, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MaterializeDirective} from "angular2-materialize";

@Component({
    selector: 'datepicker',
    templateUrl: 'app/admin/actions/show-users/user-info/datepicker.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})
export class DatepickerComponent implements OnInit{
    // TODO: refactor that

    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    onClick() {
        this.notify.emit('Click from nested component');
    }

    ngOnInit():any {
        // $('.datepicker-component').bootstrapMaterialDatePicker({ weekStart : 0, time: false });
    }

    constructor() {}
}








