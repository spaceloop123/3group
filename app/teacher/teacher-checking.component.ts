import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {TestsListData} from './tests-list.data';
import {TeacherComponent} from './teacher.component';

@Component({
    templateUrl: 'app/teacher/teacher-checking.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [TestsListData, TeacherComponent]
})

export class TeacherCheckingComponent implements OnInit {

    constructor(private teacherComponent:TeacherComponent) {
    }

    ngOnInit() {
        console.log(this.teacherComponent.selectedTest);
    }
}