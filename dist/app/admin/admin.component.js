System.register(["@angular/core", "@angular/router", "angular2-materialize", "@angular/http"], function(exports_1, context_1) {
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
    var core_1, router_1, angular2_materialize_1, http_1;
    var AdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_materialize_1_1) {
                angular2_materialize_1 = angular2_materialize_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AdminComponent = (function () {
                function AdminComponent(http) {
                    this.http = http;
                    this.newMemberUrl = '/admin/new_';
                    this.statsForUrl = '/admin/show';
                    this.rows = [
                        { username: "Pacan 1", role: "Admin", email: "email" },
                        { username: "Pacan 2", role: "Teacher", email: "email" },
                        { username: "Pacan 3", role: "Guest", email: "email" },
                        { username: "Pacan 4", role: "User", email: "email" }
                    ];
                    this.member = {
                        role: 'guest',
                        username: '',
                        password: '',
                        email: ''
                    };
                }
                //*** Add a member ***
                AdminComponent.prototype.changeMemberType = function () {
                    if (this.member.role === 'guest') {
                        this.member.role = 'teacher';
                    }
                    else {
                        this.member.role = 'guest';
                        this.member.username = '';
                        this.member.password = '';
                    }
                };
                AdminComponent.prototype.isMemberFieldsEmpty = function () {
                    if (this.member.role === 'guest') {
                        return this.member.email != '';
                    }
                    else {
                        return (this.member.email != '' && this.member.username != '' && this.member.password != '');
                    }
                };
                AdminComponent.prototype.addUser = function () {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http
                        .post(this.newMemberUrl + this.member.role, JSON.stringify(this.member), { headers: headers })
                        .toPromise()
                        .then(function (response) { return console.log(response.json()); });
                };
                //*** Show user's profile with filter ***
                AdminComponent.prototype.isProfilesFieldsEmpty = function () {
                };
                AdminComponent.prototype.showProfiles = function () {
                };
                AdminComponent = __decorate([
                    core_1.Component({
                        selector: 'admin-component',
                        templateUrl: 'app/admin/admin.home.html',
                        directives: [router_1.ROUTER_DIRECTIVES, angular2_materialize_1.MaterializeDirective]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AdminComponent);
                return AdminComponent;
            }());
            exports_1("AdminComponent", AdminComponent);
        }
    }
});
//# sourceMappingURL=admin.component.js.map