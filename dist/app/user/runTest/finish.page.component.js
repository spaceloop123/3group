System.register(["@angular/forms", "@angular/core", "@angular/router", "@angular/http"], function(exports_1, context_1) {
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
    var forms_1, core_1, router_1, http_1;
    var FinishTestPageComponent;
    return {
        setters:[
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
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
            FinishTestPageComponent = (function () {
                function FinishTestPageComponent(route, router, http) {
                    this.route = route;
                    this.router = router;
                    this.http = http;
                    this.role = 'nobody';
                }
                FinishTestPageComponent.prototype.ngOnInit = function () {
                    var that = this;
                    this.sub = this.route.params.subscribe(function (params) {
                        that.role = params['role'];
                        console.log('that.status ' + that.role);
                    });
                    this.autoExit();
                };
                FinishTestPageComponent.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                    clearTimeout(this.timeout_id);
                };
                FinishTestPageComponent.prototype.autoExit = function () {
                    var that = this;
                    this.timeout_id = setTimeout(function () { return that.exit(); }, 5000);
                };
                FinishTestPageComponent.prototype.exit = function () {
                    var link = (this.role === "user") ? "/user" : "/logo"; //потом сделать для quest logOut
                    this.router.navigate([link]);
                };
                FinishTestPageComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/user/runTest/finish-page.html',
                        directives: [forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, http_1.Http])
                ], FinishTestPageComponent);
                return FinishTestPageComponent;
            }());
            exports_1("FinishTestPageComponent", FinishTestPageComponent);
        }
    }
});
//# sourceMappingURL=finish.page.component.js.map