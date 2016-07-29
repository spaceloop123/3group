import {Component, OnDestroy, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {NavigationItem} from "./navigation.item";
import {TestComponent} from "../test/test.component";
import {TestInfo} from "../test/test.info";
import {MaterializeDirective} from "angular2-materialize";




@Component({
    templateUrl: 'app/teacher/teacher-checking.html',
    directives: [ROUTER_DIRECTIVES, TestComponent, MaterializeDirective],
    providers: [TestComponent]
})
export class TeacherCheckingComponent implements OnInit, OnDestroy {

    public currentTest: any;
    private sub;
    answersId: any[];
    private navigationItems: NavigationItem[];
    testInfo: TestInfo;
    opMode: string;
    rangeValue: number;
    currentIndex: number;
    leftIconStatus: string = '';
    rightIconStatus: string = '';

    saveCurrentIndex() {
        localStorage.setItem('currentIndex', JSON.stringify(this.currentIndex));
    }

    restoreCurrentIndex() {
        return JSON.parse(localStorage.getItem('currentIndex'));
    }

    goToPreviousItem(tc: TestComponent): boolean{
        // this.currentIndex = this.restoreCurrentIndex();
        if(this.currentIndex <= 0){
            return false;
        } else {
            this.currentIndex = this.currentIndex - 1;
            this.saveCurrentIndex();
            tc.goByItem(this.navigationItems[this.currentIndex ]);
            return true;
        }
    }

    

    getRightIconState(){

    }

    goByItem(item: NavigationItem, index: number, tc: TestComponent){
        this.currentIndex = index;
        this.saveCurrentIndex();
        //console.log('index ' + index);
        tc.goByItem(item);
    }
    
    goToNextItem(tc: TestComponent): boolean{
       // this.currentIndex = this.restoreCurrentIndex();
        if(!this.navigationItems){
        return false;
    } else if(this.currentIndex >= this.navigationItems.length - 1) {
        return false;
    }else{
            this.currentIndex  = this.currentIndex + 1;
            this.saveCurrentIndex();
        tc.goByItem(this.navigationItems[this.currentIndex]);
            return true;
    }

}
    constructor(private route:ActivatedRoute,
                private http:Http,
                private test: TestComponent) {
        this.navigationItems = new Array();
        this.answersId = [];
        this.opMode = "teacher";

    }

    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.currentTest = params['id'];
            console.log('that.currentTest ' + that.currentTest);
        });
        this.currentIndex = this.restoreCurrentIndex();
        if(this.currentIndex === null){
            this.currentIndex = 0;
        }
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.post('/teacher/check_test',
            JSON.stringify({testId: that.currentTest}), {headers: header})
            .toPromise()
            .then(response => that.onResponse(response))
            .catch();
    }

    onResponse(response){
        this.answersId = response.json().answers;
        this.makeNavigation(this.answersId);
        console.log(this.answersId);
        this.testInfo = new TestInfo(0, this.answersId.length, this.currentTest);
    }
    
    getState(index: number):any{
        return {
            active: index === this.currentIndex,
            'waves-effect': index !== this.currentIndex
        };
        //if(index === this.currentIndex){
        //    return 'active';
        //} else {
        //    return "waves-effect";
        //}
        
    }

    makeNavigation(answersId: any[]){
        let counter = 1;
        let result = [];
        let index = 0;
        for(let item of answersId){
            result.push(new NavigationItem(counter, null));
            ++index;
            let subCounter = 0;
            if(item.subIds){
                for(let index of item.subIds){
                    result.push(new NavigationItem(counter, subCounter));
                    subCounter += 1;
                    ++index;
                }
            }
            counter += 1;
        }
        console.log(this.navigationItems);
        this.navigationItems = result;
    }
    
    ngOnDestroy():any {
        this.sub.unsubscribe();
    }
    

}
