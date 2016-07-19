System.register(["@angular/core", "@angular/router", "@angular/http", "@angular/forms", 'angular2-materialize', "./test.info"], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, forms_1, angular2_materialize_1, test_info_1;
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
            },
            function (angular2_materialize_1_1) {
                angular2_materialize_1 = angular2_materialize_1_1;
            },
            function (test_info_1_1) {
                test_info_1 = test_info_1_1;
            }],
        execute: function() {
            RunTestComponent = (function () {
                function RunTestComponent(route, router, http) {
                    this.route = route;
                    this.router = router;
                    this.http = http;
                    /* this.question = {
                     type: 'test',
                     header: "Add a  model for the list of checked recipients. ",
                     question: 'Type the search and replacement text explicitly, or specify patterns using regular expression, or select a previously used piece of text or a pattern from the recent history drop-down list. ',
                     options: [{name: 'aaa', checked: true},
                     {name: 'bbb', checked: true},
                     {name: 'ccc', checked: false},
                     {name: 'ddd', checked: false},
                     {name: 'eee', checked: true},],
                     answer: 'buka'
                     //options: ["Hello1", "Hello2", "Hello3"]
                     };*/
                    this.subQuestions = new Array();
                    this.index = 0;
                    this.subQ = false;
                    this.options = new Array();
                    this.controlNames = ["aaa", "bbb", "ccc"];
                    this.isPlayed = false;
                    this.openAnswer = "bukaOpen";
                    /*this.id = '';
                     localStorage.setItem(name, 'Vasia');
                     console.log(localStorage.getItem(name));*/
                    this.question = { type: "nothing" };
                    this.counter = 1;
                }
                RunTestComponent.prototype.changeCheckState = function (idx) {
                    console.log(idx);
                    console.log(this.options[idx].checked);
                    this.options[idx].checked = !this.options[idx].checked;
                };
                RunTestComponent.prototype.ngOnInit = function () {
                    var that = this;
                    this.sub = this.route.params.subscribe(function (params) {
                        that.role = params['role'];
                        console.log('that.status ' + that.role);
                    });
                    this.http.get('/' + this.role + '/initTest')
                        .toPromise()
                        .then(function (response) { return that.onResponse(response); })
                        .catch(this.handleError);
                };
                RunTestComponent.prototype.nextQuestion = function () {
                    console.log('data ' + this.testInfo.numQuestions + '  ' + this.counter);
                    if (this.index >= this.subQuestions.length) {
                        this.subQ = false;
                        this.index = 0;
                        this.subQuestions = [];
                    }
                    if (this.counter >= 7 && !this.subQ) {
                        this.finishTest();
                    }
                    else if (!this.subQ) {
                        this.testInfo = localStorage.getItem("testInfo");
                        //this.testInfo.num = this.testInfo.num + 1;
                        ++this.counter;
                        this.getNextQuestion();
                    }
                    else if (this.index < this.subQuestions.length) {
                        this.question = this.subQuestions[this.index];
                        console.log("this.question " + this.subQuestions);
                        ++this.index;
                        if (this.question.type === 'TestQuestion') {
                            this.makeOptions();
                        }
                    }
                    else {
                    }
                };
                RunTestComponent.prototype.getNextQuestion = function () {
                    var that = this;
                    var header = new http_1.Headers();
                    header.append('Content-Type', 'application/json');
                    this.http
                        .post('/' + this.role + '/next_question', JSON.stringify({ n: that.counter, testId: that.testInfo.id }), { headers: header })
                        .toPromise()
                        .then(function (response) { return that.print(response.json()); })
                        .catch(that.handleError);
                };
                RunTestComponent.prototype.makeOptions = function () {
                    this.options = [];
                    for (var index = 0; index < this.question.answers.length; ++index) {
                        console.log('answer' + this.question.answers[index]);
                        this.options.push({ name: this.question.answers[index], checked: false });
                    }
                };
                RunTestComponent.prototype.print = function (response) {
                    localStorage.setItem('testInfo', JSON.stringify(this.testInfo));
                    this.question = response;
                    if (this.question.type === 'TestQuestion') {
                        this.makeOptions();
                    }
                };
                RunTestComponent.prototype.onResponse = function (response) {
                    this.parse(response.json().time, response.json().count, response.json().testId);
                    this.getNextQuestion();
                };
                RunTestComponent.prototype.handleError = function (error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                RunTestComponent.prototype.parse = function (time, numQuestion, id) {
                    this.testInfo = new test_info_1.TestInfo(time, numQuestion, id, this.counter);
                    localStorage.setItem('testInfo', JSON.stringify(this.testInfo));
                };
                RunTestComponent.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                RunTestComponent.prototype.finishTest = function () {
                    this.router.navigate(['/finishTest', this.role]);
                };
                RunTestComponent.prototype.printSubquestions = function () {
                    this.subQ = true;
                    this.index = 0;
                    this.subQuestions = this.question.subQuestions;
                    console.log('subQuestions ' + this.subQuestions);
                    this.nextQuestion();
                };
                RunTestComponent.prototype.playAydio = function () {
                    if (!this.isPlayed) {
                        this.myAudio = new Audio();
                        this.myAudio.src = "http://vignette4.wikia.nocookie.net/starwars/images/f/f5/A_little_short.ogg/revision/latest?cb=20090519125603";
                        this.myAudio.load();
                        //audio.play();
                        this.isPlayed = true;
                        this.playCount = 0;
                    }
                    if (this.playCount < 2 && this.myAudio.paused) {
                        this.myAudio.play();
                        var that = this;
                        this.myAudio.addEventListener("ended", function () { return that.playCount += 1; });
                    }
                    if (this.playCount >= 2) {
                        console.log('Your have spent all of the attempts!');
                    }
                };
                RunTestComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/user/runTest/runTest.html',
                        directives: [forms_1.REACTIVE_FORM_DIRECTIVES, angular2_materialize_1.MaterializeDirective, router_1.ROUTER_DIRECTIVES]
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