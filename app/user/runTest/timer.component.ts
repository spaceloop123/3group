import {OnDestroy, OnInit, Component, Input} from "@angular/core";
import {Observable} from "rxjs/Rx";
/**
 * Created by nastya on 21.7.16.
 */

@Component({
    selector: 'countdown-timer',
    templateUrl: 'app/user/runTest/timer.html',
    directives: []
})
    
export class TimerComponent implements OnInit, OnDestroy {
    @Input() timeLeft: number = 0;
    timerSec: number;
    timer: any;
    
    ngOnInit() {
        var that = this;
        this.timerSec = this.timeLeft;
        this.timer = Observable.timer(2000,1000);
        this.timer.subscribe(t => that.timeLeft = that.timerSec - t);
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }

    public showTime() : string {
        let hour = Math.floor(this.timeLeft / 3600);
        let theRest = this.timeLeft - hour * 3600;
        let min = Math.floor(theRest / 60);
        let sec = theRest - min * 60;
        return (hour.toString() + ":" + min.toString() + ":" + sec.toString());
    }
}