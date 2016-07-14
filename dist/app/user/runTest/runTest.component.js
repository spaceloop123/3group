System.register(["@angular/core", "@angular/router", "@angular/http", "@angular/forms"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, forms_1;
    var RunTestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            RunTestComponent = (function () {
                function RunTestComponent(route, router, http) {
                    this.route = route;
                    this.router = router;
                    this.http = http;
                    this.question = {
                        type: 'listening',
                        description: "Add a  model for the list of checked recipients. ",
                        //options : new FormArray([new FormControl('bla1'), new FormControl('bla2')])
                        info: 'Type the search and replacement text explicitly, or specify patterns using regular expression, or select a previously used piece of text or a pattern from the recent history drop-down list. ',
                        opt: [{ name: 'aaa', checked: true },
                            { name: 'bbb', checked: true },
                            { name: 'ccc', checked: false },
                            { name: 'ddd', checked: false },
                            { name: 'eee', checked: true },]
                    };
                    this.mainFormGroup = new forms_1.FormGroup({
                        options: new forms_1.FormArray([new forms_1.FormControl(),
                            new forms_1.FormControl(),
                            new forms_1.FormControl()
                        ])
                    });
                    this.controlNames = ["aaa", "bbb", "ccc"];
                    this.isPlayed = false;
                }
                RunTestComponent.prototype.changeCheckState = function (idx) {
                    console.log(idx);
                    console.log(this.question.opt[idx].checked);
                    this.question.opt[idx].checked = !this.question.opt[idx].checked;
                };
                RunTestComponent.prototype.ngOnInit = function () {
                    var that = this;
                    /*this.http.get('/runTest')
                     .toPromise()
                     .then(response => that.question = response.json().question)
                     .catch(this.handleError);*/
                };
                RunTestComponent.prototype.onChange = function (event) {
                    //console.log(selected);
                    //var isChecked = event.currentTarget.checked;
                    var isChecked = event.currentTarget.checked;
                    //selected = !selected;
                };
                RunTestComponent.prototype.handleError = function (error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                RunTestComponent.prototype.ngOnDestroy = function () {
                };
                RunTestComponent.prototype.playAydio = function () {
                    var audio = new Audio();
                    audio.src = "http://www.vorbis.com/music/Lumme-Badloop.ogg";
                    if (!this.isPlayed) {
                        audio.load();
                        audio.play();
                        this.isPlayed = !this.isPlayed;
                    }
                    else {
                        console.log('pause');
                        //this.isPlayed = !this.isPlayed;
                        audio.pause();
                    }
                };
                RunTestComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/user/runTest/runTest.html',
                        directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, http_1.Http])
                ], RunTestComponent);
                return RunTestComponent;
            }());
            exports_1("RunTestComponent", RunTestComponent);
        }
    }
});
//# sourceMappingURL=runTest.component.js.map