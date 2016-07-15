import {Component, OnDestroy, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {TestsListData} from './tests-list.data';

@Component({
    templateUrl: 'app/teacher/teacher-checking.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [TestsListData]
})
export class TeacherCheckingComponent implements OnInit, OnDestroy{

    public currentTest : any;
    private sub;

    constructor(private route:ActivatedRoute) {}

    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.currentTest = params['name'];
            console.log('that.currentTest ' + that.currentTest);
        });
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

}
