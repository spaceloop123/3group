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
    var TeacherCheckingComponent;
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
            TeacherCheckingComponent = (function () {
                function TeacherCheckingComponent(route, http) {
                    this.route = route;
                    this.http = http;
                }
                TeacherCheckingComponent.prototype.ngOnInit = function () {
                    var that = this;
                    this.sub = this.route.params.subscribe(function (params) {
                        that.currentTest = params['id'];
                        console.log('that.currentTest ' + that.currentTest);
                    });
                    this.http.get('/teacher/get_test')
                        .toPromise()
                        .then(function (response) { return console.log("kxjfhgjkxhjfgxk"); })
                        .catch();
                };
                TeacherCheckingComponent.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                TeacherCheckingComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/teacher/teacher-checking.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http])
                ], TeacherCheckingComponent);
                return TeacherCheckingComponent;
            }());
            exports_1("TeacherCheckingComponent", TeacherCheckingComponent);
        }
    }
});
//# sourceMappingURL=teacher-checking.component.js.map