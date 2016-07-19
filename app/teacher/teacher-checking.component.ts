import {Component, OnDestroy, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: 'app/teacher/teacher-checking.html',
    directives: [ROUTER_DIRECTIVES]
})
export class TeacherCheckingComponent implements OnInit, OnDestroy{

    public currentTest : any;
    private sub;

    constructor(private route:ActivatedRoute) {}

    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.currentTest = params['id'];
            console.log('that.currentTest ' + that.currentTest);
        });
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

}
