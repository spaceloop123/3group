System.register(["@angular/core", "@angular/router", "@angular/http"], function (exports_1, context_1) {
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
    var HomepageComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function () {
            HomepageComponent = (function () {
                function HomepageComponent(route, router, http) {
                    this.route = route;
                    this.router = router;
                    this.http = http;
                    this.availTest = true;
                }
                HomepageComponent.prototype.ngOnInit = function () {
                    var that = this;
                    this.sub = this.route.params.subscribe(function (params) {
                        that.status = params['status'];
                        console.log('that.status ' + that.status);
                    });
                    if (this.status === 'user' || this.status === 'guest') {
                    }
                    console.log(this.availTest);
                };
                HomepageComponent.prototype.getData = function () {
                    var that = this;
                    this.http.get('/' + status + '/availtest')
                        .toPromise()
                        .then(function (response) {
                            return that.availTest = response.json().data;
                        })
                        .catch(this.handleError);
                };
                HomepageComponent.prototype.handleError = function (error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                HomepageComponent.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                HomepageComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/homepage/homepage.html',
                        styleUrls: ['../assets/libs/materialize.css',
                            '../assets/libs/materialize.min.css',],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, http_1.Http])
                ], HomepageComponent);
                return HomepageComponent;
            }());
            exports_1("HomepageComponent", HomepageComponent);
        }
    }
});
//# sourceMappingURL=homepage.component.js.map