System.register(['@angular/core', "@angular/router", "@angular/http"], function(exports_1, context_1) {
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
    var core_1, router_1, http_1;
    var UserComponent;
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
            }],
        execute: function() {
            UserComponent = (function () {
                function UserComponent(route, router, http) {
                    this.route = route;
                    this.router = router;
                    this.http = http;
                    this.testInfo = {
                        status: 'availTest',
                        time: '20 min',
                        numQuestions: '50'
                    };
                    console.log(this.testInfo.status);
                }
                UserComponent.prototype.ngOnInit = function () {
                    // this.getTestInfo();
                };
                UserComponent.prototype.getTestInfo = function () {
                    var that = this;
                    this.http.get('/testInfo')
                        .toPromise()
                        .then(function (response) { return that.testInfo = response.json().testInfo; })
                        .catch(this.handleError);
                };
                UserComponent.prototype.handleError = function (error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                UserComponent.prototype.testWaiter = function () {
                    while (this.testInfo.status !== 'availTest') {
                        setTimeout(function () {
                            this.getTestInfo();
                        }, 3000);
                    }
                };
                UserComponent.prototype.runTest = function () {
                    console.log('runtest');
                    this.router.navigate(['/runTest', 'user']);
                };
                UserComponent.prototype.askTest = function () {
                    console.log('test is asked');
                    var that = this;
                    this.http.get('/user/askTest')
                        .toPromise()
                        .then(function (response) { return that.testInfo.status = 'requestedTest'; })
                        .catch(this.handleError);
                };
                UserComponent = __decorate([
                    core_1.Component({
                        selector: 'user-component',
                        templateUrl: 'app/user/user-home.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, http_1.Http])
                ], UserComponent);
                return UserComponent;
            }());
            exports_1("UserComponent", UserComponent);
        }
    }
});
//# sourceMappingURL=user.component.js.map