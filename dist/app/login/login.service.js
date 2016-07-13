System.register(["@angular/core", "@angular/http", "rxjs/add/operator/toPromise"], function(exports_1, context_1) {
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
    var core_1, http_1;
    var LoginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            LoginService = (function () {
                function LoginService(http) {
                    this.http = http;
                    this.loginUrl = '/login';
                }
                LoginService.prototype.redirect = function (response, router) {
                    console.log("respose " + response);
                    router.navigate(['/homepage', response]);
                    //
                };
                LoginService.prototype.postAndRedirect = function (loginData, router) {
                    var header = new http_1.Headers();
                    var that = this;
                    header.append('Content-Type', 'application/json');
                    this.http
                        .post(this.loginUrl, JSON.stringify(loginData), { headers: header })
                        .toPromise()
                        .then(function (res) { return that.redirect(res.json().role, router); })
                        .catch(that.handleError);
                };
                LoginService.prototype.handleError = function (error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                LoginService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LoginService);
                return LoginService;
            }());
            exports_1("LoginService", LoginService);
        }
    }
});
//# sourceMappingURL=login.service.js.map