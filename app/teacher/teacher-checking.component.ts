import {Component, OnDestroy, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {NavigationItem} from "./navigation.item";
import {TestComponent} from "../test/test.component";
import {TestInfo} from "../test/test.info";
import {MaterializeDirective, toast} from "angular2-materialize";

@Component({
    templateUrl: 'app/teacher/teacher-checking.html',
    directives: [ROUTER_DIRECTIVES, TestComponent, MaterializeDirective],
    providers: [TestComponent]
})
export class TeacherCheckingComponent implements OnInit, OnDestroy {

    public currentTest:any;
    private sub;
    answersId:any[];
    private navigationItems:NavigationItem[];
    testInfo:TestInfo;
    opMode:string;
    rangeValue:number;
    currentIndex:number;
    leftIconStatus:string = '';
    rightIconStatus:string = '';
    parentNIIndex:number = 0;
    childNIIndex:number = 0;
    parentButtonClass: string = 'no-display-style';
    childButtonClass: string = 'no-display-style';
    finishButtonClass: string = 'no-display-style';
    status:number[];
    sendButtonClass: string = 'no-display-style';
    nextButtonClass: string = 'no-display-style';
    countSentAnswers: number = 0;
    totalAnswersCount: number = 0;

    constructor(private route:ActivatedRoute,
                private http:Http,
                private router:Router) {
        this.navigationItems = new Array();
        this.answersId = [];
        this.opMode = "teacher";
        this.status = new Array();


    }

    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.currentTest = params['id'];
        });
        this.currentIndex = this.restoreCurrentIndex();
        if (this.currentIndex === null) {
            this.currentIndex = 0;
        }
        this.countSentAnswers = this.restoreCountSentAnswers();
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.post('/teacher/check_test',
            JSON.stringify({testId: that.currentTest}), {headers: header})
            .toPromise()
            .then(response => that.onResponse(response))
            .catch();
    }


    saveCurrentIndex() {
        localStorage.setItem('currentIndex', JSON.stringify(this.currentIndex));
    }

    restoreCurrentIndex() {
        return JSON.parse(localStorage.getItem('currentIndex'));
    }

    saveStatus() {
        localStorage.setItem('status', JSON.stringify(this.status));
    }

    restoreStatus() {
        return JSON.parse(localStorage.getItem('status'));
    }

    saveCountSentAnswers() {
        localStorage.setItem('countSentAnswers', JSON.stringify(this.countSentAnswers));
    }

    restoreCountSentAnswers() {
        return JSON.parse(localStorage.getItem('countSentAnswers'));
    }



    goToParent(tc:TestComponent) {
        this.parentButtonClass = 'no-display-style';
        this.childButtonClass = 'display-style';

        this.currentIndex = this.parentNIIndex;
        tc.goByItem(this.navigationItems[this.currentIndex]);
        this.childButtonClass = 'active';
        this.getSendButtonClass();
        this.saveCurrentIndex();


    }

    activateParentButton(){
        let item = this.navigationItems[this.currentIndex];
        if(item.subQuestionIndex !== null){
            this.findParent(this.currentIndex);
            this.parentButtonClass = 'display-style';
            this.childButtonClass = 'no-display-style';
        } else {
            this.parentButtonClass = 'no-display-style';
            this.childButtonClass = 'no-display-style';
        }
    }

    goToChild(tc:TestComponent) {
        this.childButtonClass = 'no-display-style';
        this.currentIndex = this.childNIIndex;
        tc.goByItem(this.navigationItems[this.currentIndex]);
        this.parentButtonClass = 'display-style';
        this.getSendButtonClass();
        this.saveCurrentIndex();
    }


    
    finishCheckTest(){
        let  testId = JSON.parse(localStorage.getItem('subQuestionInfo')).testId;
        let that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post('/teacher/end_test',
                JSON.stringify({testId: testId}), {headers: header})
            .toPromise()
            .then(response => {
                    that.router.navigate(['/home']);
                    localStorage.clear();
            }).catch();
        
    }
    
    sendAndGo(tc: TestComponent){
        this.status[this.currentIndex] = NavigationItem.CHECKED;
        this.saveStatus();
        let that = this;
        if(this.rangeValue > 100 || this.rangeValue < 0){
            toast('Please, change your mark', 3000, 'red');
            this.rangeValue = 0;
        } else {
            let mark = this.rangeValue;
            tc.sendMarkToServer(mark, () => that.goToNextItem(tc));
            ++this.countSentAnswers;
            this.saveCountSentAnswers();
            this.canFinishCheck();
            this.rangeValue = 0;
        }

        
    }
    

    findParent(index:number) {
        this.childNIIndex = index;
        this.parentNIIndex = index - this.navigationItems[this.childNIIndex].subQuestionIndex - 1;
    }

    getSendButtonClass(){
        if(this.status[this.currentIndex] === NavigationItem.NO_ANSWER ||
                this.status[this.currentIndex] === NavigationItem.CHECKED) {
            this.sendButtonClass = 'no-display-style';
            this.nextButtonClass = 'display-style';
        } else {
            this.sendButtonClass = 'display-style';
            this.nextButtonClass = 'no-display-style';
        }
    }

    canFinishCheck(): boolean{
        console.log('this.countSentAnswers ' + this.countSentAnswers);
        console.log('this.totalAnswersCount ' + this.totalAnswersCount);
        if(this.countSentAnswers === this.totalAnswersCount){
            console.log('we are here');
            this.finishButtonClass = 'display-style';
            this.sendButtonClass = 'no-display-style';
            this.nextButtonClass = 'no-display-style';
            return true;
        } else {
            return false;
        }
    }


    goByItem(index:number, tc:TestComponent) {

        this.currentIndex = index;
        this.canGo();
        this.saveCurrentIndex();
        this.getSendButtonClass();
        let item = this.navigationItems[this.currentIndex];
        tc.goByItem(item);
        this.canFinishCheck();
        this.activateParentButton();



    }

    canGo(){
        console.log('cango');
        if(this.currentIndex === this.navigationItems.length - 1){
            //console.log('cango1');
            this.rightIconStatus = 'disabled';

        } else if(this.currentIndex  === 0){
            //console.log('cango2');
            this.leftIconStatus = 'disabled';
        } else {
            this.leftIconStatus = 'waves-effect';
            this.rightIconStatus = 'waves-effect';

        }
    }

    goToNextItem(tc:TestComponent):boolean {
        if (!this.navigationItems) {
            return false;
        } else if (this.currentIndex >= this.navigationItems.length - 1) {
            return false;
        } else {
            this.currentIndex = this.currentIndex + 1;
            this.goByItem(this.currentIndex, tc);
            return true;
        }

    }

    goToPreviousItem(tc:TestComponent):boolean {
        // this.currentIndex = this.restoreCurrentIndex();
        if (this.currentIndex <= 0) {
            return false;
        } else {
            this.currentIndex = this.currentIndex - 1;
            this.goByItem(this.currentIndex, tc);
            return true;
        }
    }


    onResponse(response) {
        this.answersId = response.json().answers;
        this.makeNavigation(this.answersId);
        //console.log("onResponce after makeNav() = " + JSON.stringify(this.navigationItems));
        //console.log(this.answersId);
        this.testInfo = new TestInfo(0, this.answersId.length, this.currentTest);
        this.activateParentButton();
    }

    getState(index:number):any {
        if (index === this.currentIndex) {
            return 'active red';
        } else if (this.status[index] === NavigationItem.NO_ANSWER) {
            return 'amber lighten-4';
        } else if (this.status[index] === NavigationItem.CHECKED) {
            return 'green lighten-4';
        } else {
            return 'waves-effect';
        }
    }


    makeNavigation(answersId:any[]) {
        let counter = 1;
        let result = [];
        let index = 0;
        for (let item of answersId) {
            result.push(new NavigationItem(counter, null, NavigationItem.UNCHECKED));
            ++index;
            ++this.totalAnswersCount;
            let subCounter = 0;
            if (item.subAnswersId.length !== 0) {
                --this.totalAnswersCount;
                result[result.length - 1].status = NavigationItem.NO_ANSWER;
                for (let index of item.subAnswersId) {
                    ++this.totalAnswersCount;
                    result.push(new NavigationItem(counter, subCounter, NavigationItem.UNCHECKED));
                    subCounter += 1;
                    ++index;
                }
            }
            counter += 1;
        }
        // console.log(this.navigationItems);
        this.navigationItems = result;
        if(this.navigationItems[this.currentIndex].subQuestionIndex !== null){
            this.findParent(this.currentIndex);
        }
        let buffer = this.restoreStatus();
        //console.log('status ' + buffer);
        if(buffer){
            this.status = buffer;
        } else{
            this.createStatus();
        }
        this.getSendButtonClass();
        this.canGo();
        let countAnswers = this.restoreCountSentAnswers();
        if(countAnswers){
            console.log('countAnswers ' + countAnswers);
            this.countSentAnswers = countAnswers;
            this.canFinishCheck();

        }

    }
    
    createStatus(){
        this.status = new Array();
        for(let item of this.navigationItems){
            this.status.push(item.status);
        }
        this.saveStatus();
    }
    
    ngOnDestroy():any {
        this.sub.unsubscribe();
    }


}
