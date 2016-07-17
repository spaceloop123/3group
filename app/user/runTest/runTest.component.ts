import {Component, OnDestroy, OnInit, ElementRef} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {Http} from "@angular/http";
import {FormArray, FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {MaterializeDirective} from 'angular2-materialize'

@Component({
    templateUrl: 'app/user/runTest/runTest.html',
    directives:     [REACTIVE_FORM_DIRECTIVES, MaterializeDirective, ROUTER_DIRECTIVES]
})

export class RunTestComponent implements OnInit, OnDestroy {

    question : any;
    myAudio : any;
    sub: any;
    role: any;
    controlNames: string[];
    isPlayed: boolean;
    playCount: number;
    openAnswer: string;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.question = {
            type: 'test',
            description: "Add a  model for the list of checked recipients. ",
            //options : new FormArray([new FormControl('bla1'), new FormControl('bla2')])
            info: 'Type the search and replacement text explicitly, or specify patterns using regular expression, or select a previously used piece of text or a pattern from the recent history drop-down list. ',
            opt: [{name: 'aaa', checked: true},
        {name: 'bbb', checked: true},
        {name: 'ccc', checked: false},
        {name: 'ddd', checked: false},
        {name: 'eee', checked: true},],
            answer: 'buka',
            options: ["Hello1", "Hello2", "Hello3"]
        };
        this.controlNames = ["aaa", "bbb", "ccc"];
        this.isPlayed = false;
        this.openAnswer = "bukaOpen";

    }

    changeCheckState(idx) {
        console.log(idx);
        console.log(this.question.opt[idx].checked);
        this.question.opt[idx].checked = !this.question.opt[idx].checked;
    }

    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.role = params['role'];
            console.log('that.status ' + that.role);
        });
        /*this.http.get('/runTest')
         .toPromise()
         .then(response => that.question = response.json().question)
         .catch(this.handleError);*/
    }
    
    onChange(event){
        //console.log(selected);
        //var isChecked = event.currentTarget.checked;
        var isChecked = event.currentTarget.checked;
        //selected = !selected;
    }

    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    finishTest(){
        console.log('finishTest');
        this.router.navigate(['/finishTest', this.role]);
    }

    playAydio(){

        if(!this.isPlayed) {
            this.myAudio = new Audio();
            this.myAudio.src = "http://vignette4.wikia.nocookie.net/starwars/images/f/f5/A_little_short.ogg/revision/latest?cb=20090519125603";
            this.myAudio.load();
            //audio.play();
            this.isPlayed = true;
            this.playCount = 0;
            //audio.addEventListener("ended")
        }
            if(this.playCount < 2 && this.myAudio.paused){
                this.myAudio.play();
                var that = this;
                this.myAudio.addEventListener("ended", () => that.playCount += 1);
            }
        if(this.playCount >= 2) {
            console.log('Your have spent all of the attempts!');


        }
    }

    nextQuestion(){
        console.log('nextQuestion');
        this.finishTest();
    }


}
