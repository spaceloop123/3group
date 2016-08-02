System.register(["@angular/core", "@angular/router", "./cards-colors.data", "rxjs/add/operator/toPromise", "../common/services/CustomHttp", "angular2-materialize/dist/index", 'moment/moment'], function(exports_1, context_1) {
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
    var core_1, router_1, cards_colors_data_1, CustomHttp_1, index_1, moment_1;
    var TeacherComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cards_colors_data_1_1) {
                cards_colors_data_1 = cards_colors_data_1_1;
            },
            function (_1) {},
            function (CustomHttp_1_1) {
                CustomHttp_1 = CustomHttp_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            TeacherComponent = (function () {
                function TeacherComponent(cardsColorsData, customHttp, router) {
                    this.cardsColorsData = cardsColorsData;
                    this.customHttp = customHttp;
                    this.router = router;
                    this.momentConstructor = moment_1.default.default || moment_1.default;
                }
                TeacherComponent.prototype.getTests = function () {
                    var that = this;
                    this.customHttp.get('/teacher/tests')
                        .subscribe(function (response) {
                        that.setTests(response.json());
                    });
                };
                TeacherComponent.prototype.setTests = function (response) {
                    var i = 0;
                    var j = 0;
                    for (; i < response.length; i++, j++) {
                        //setting cards color
                        if (j >= this.cardsColorsData.CARDS_COLORS_ACCENT.length) {
                            j = 0;
                        }
                        response[i].color = this.cardsColorsData.CARDS_COLORS_ACCENT[j];
                        //---------------
                        response[i].number = i + 1;
                    }
                    this.assignedTests = response;
                    console.log(this.assignedTests);
                };
                TeacherComponent.prototype.checkTest = function (test) {
                    //this happens when teacher clicks CHECK button
                    this.router.navigate(['/teacher/check_test', test.id]);
                };
                TeacherComponent.prototype.ngOnInit = function () {
                    this.customHttp.checkRole();
                    this.getTests();
                };
                TeacherComponent = __decorate([
                    core_1.Component({
                        selector: 'teacher-component',
                        templateUrl: 'app/teacher/teacher-home.html',
                        directives: [router_1.ROUTER_DIRECTIVES, index_1.MaterializeDirective],
                        providers: [cards_colors_data_1.CardsColorsData, CustomHttp_1.CustomHttp]
                    }), 
                    __metadata('design:paramtypes', [cards_colors_data_1.CardsColorsData, CustomHttp_1.CustomHttp, router_1.Router])
                ], TeacherComponent);
                return TeacherComponent;
            }());
            exports_1("TeacherComponent", TeacherComponent);
        }
    }
});
//# sourceMappingURL=teacher.component.js.map