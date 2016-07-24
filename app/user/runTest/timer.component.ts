import {OnDestroy, OnInit, Component, Input} from "@angular/core";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'countdown-timer',
    templateUrl: 'app/user/runTest/timer.html',
    directives: []
})
    
export class TimerComponent implements OnInit, OnDestroy {
    @Input() timeLeft: number = 0;
    timerSec: number;
    subscription: any;
    
    ngOnInit() {
        var that = this;
        this.timerSec = this.timeLeft;
        let timer = Observable.timer(2000,1000);
        this.subscription = timer.subscribe(t => that.timeLeft = that.timerSec - t);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    zeroPad(num: number) : string{
        if(num < 10){
            return ("0" + num.toString());
        }
        else{
            return num.toString();
        }
    }

    getClassForTime(timeLeft) : string{
        if(timeLeft > 600){
            return "has-enough-time";
        }
        if(timeLeft > 200) {
            return "has-middle-amount-of-time";
        }
        return 'has-few-time';        
    }

    public showTime() : string {
        let hour = Math.floor(this.timeLeft / 3600);
        let theRest = this.timeLeft - hour * 3600;
        let min = Math.floor(theRest / 60);
        let sec = theRest - min * 60;
        return (hour.toString() + ":" + this.zeroPad(min) + ":" + this.zeroPad(sec));
    }
}