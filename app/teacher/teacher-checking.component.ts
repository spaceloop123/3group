import {Component, OnDestroy, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {NavigationItem} from "./navigation.item";
import {TestComponent} from "../test/test.component";
import {TestInfo} from "../test/test.info"




@Component({
    templateUrl: 'app/teacher/teacher-checking.html',
    directives: [ROUTER_DIRECTIVES, TestComponent],
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
    currentItem: NavigationItem;

    goByItem(item: NavigationItem){
        this.currentItem = item;
        this.test.goByItem(item);
    }

    goToPreviousItem(): boolean{
        console.log('goToPreviousItem' + this.currentItem.index);
        if(this.currentItem.index <= 0){
            return false;
        }
        //this.test.goByItem(this.navigationItems[item.index - 1]);
        return true;
    }
    
    goToNextItem(): boolean{
        console.log('goToNextItem');
        if(this.currentItem.index >= this.navigationItems.length - 1){
            return false;
        }
        //this.test.goByItem(this.navigationItems[item.index + 1]);
        return true;
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

    makeNavigation(answersId: any[]){
        let counter = 1;
        let result = [];
        let index = 0;
        for(let item of answersId){
            result.push(new NavigationItem(counter, null, index));
            ++index;
            let subCounter = 0; // ASCII code of 'a' letter
            if(item.subIds){
                for(let index of item.subIds){
                    result.push(new NavigationItem(counter, subCounter, index));
                    subCounter += 1;
                    ++index;
                }
            }
            counter += 1;
        }
        console.log(this.navigationItems);
        this.navigationItems = result;
    }

    goTo(item: NavigationItem){
        
    }
    
    ngOnDestroy():any {
        this.sub.unsubscribe();
    }
    

}
