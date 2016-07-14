import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {Http} from "@angular/http";
import {FormArray, FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import push = require("core-js/fn/array/push");

@Component({
    templateUrl: 'app/user/runTest/runTest.html',
    directives:     [REACTIVE_FORM_DIRECTIVES]
})

export class RunTestComponent implements OnInit, OnDestroy {

    question : any;
    mainFormGroup : any;
    controlNames: any;
    isPlayed: boolean;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.question = {
            type: 'listening',
            description: "Add a  model for the list of checked recipients. ",
            //options : new FormArray([new FormControl('bla1'), new FormControl('bla2')])
            info: 'Type the search and replacement text explicitly, or specify patterns using regular expression, or select a previously used piece of text or a pattern from the recent history drop-down list. ',
            opt: [{name: 'aaa', checked: true},
        {name: 'bbb', checked: true},
        {name: 'ccc', checked: false},
        {name: 'ddd', checked: false},
        {name: 'eee', checked: true},]

        };
        this.mainFormGroup = new FormGroup({
            options : new FormArray([new FormControl(),
                new FormControl(),
                new FormControl()
            ])
        });

        this.controlNames = ["aaa", "bbb", "ccc"];
        this.isPlayed = false;

    }

    changeCheckState(idx) {
        console.log(idx);
        console.log(this.question.opt[idx].checked);
        this.question.opt[idx].checked = !this.question.opt[idx].checked;
    }

    ngOnInit() {
        var that = this;
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

    }

    playAydio(){
        var audio = new Audio();
        audio.src = "http://www.vorbis.com/music/Lumme-Badloop.ogg";



        if(!this.isPlayed) {
            audio.load();
            audio.play();
            this.isPlayed = !this.isPlayed;
        }
        else {
            console.log('pause');
            //this.isPlayed = !this.isPlayed;
            audio.pause();

        }
    }


}
