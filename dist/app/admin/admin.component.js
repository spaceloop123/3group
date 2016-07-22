System.register(["@angular/core", "@angular/router", "angular2-materialize", "./actions/add-member/add-member.component", "./actions/notifications/notifications.component", "./actions/add-question/add-question.component", "../common/services/CustomHttp"], function(exports_1, context_1) {
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
    var core_1, router_1, angular2_materialize_1, add_member_component_1, notifications_component_1, add_question_component_1, CustomHttp_1;
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
            function (add_member_component_1_1) {
                add_member_component_1 = add_member_component_1_1;
            },
            function (notifications_component_1_1) {
                notifications_component_1 = notifications_component_1_1;
            },
            function (add_question_component_1_1) {
                add_question_component_1 = add_question_component_1_1;
            },
            function (CustomHttp_1_1) {
                CustomHttp_1 = CustomHttp_1_1;
            }],
        execute: function() {
            AdminComponent = (function () {
                function AdminComponent(customHttp) {
                    this.customHttp = customHttp;
                }
                AdminComponent.prototype.ngOnInit = function () {
                    this.customHttp.checkRole();
                };
                AdminComponent = __decorate([
                    core_1.Component({
                        selector: 'admin-component',
                        templateUrl: 'app/admin/admin.home.2.html',
                        directives: [router_1.ROUTER_DIRECTIVES, angular2_materialize_1.MaterializeDirective, add_member_component_1.AddMemberComponent, notifications_component_1.NotificationsComponent, add_question_component_1.AddQuestionComponent],
                        providers: [CustomHttp_1.CustomHttp]
                    }), 
                    __metadata('design:paramtypes', [CustomHttp_1.CustomHttp])
                ], AdminComponent);
                return AdminComponent;
            }());
            exports_1("AdminComponent", AdminComponent);
        }
    }
});
//# sourceMappingURL=admin.component.js.map