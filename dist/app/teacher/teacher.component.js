System.register(['@angular/core', "@angular/router", "./cards-colors.data", "@angular/http", 'rxjs/add/operator/toPromise'], function(exports_1, context_1) {
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
    var core_1, router_1, cards_colors_data_1, http_1;
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
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            TeacherComponent = (function () {
                function TeacherComponent(cardsColorsData, http, router) {
                    this.cardsColorsData = cardsColorsData;
                    this.http = http;
                    this.router = router;
                    this.generateRandomColor = function () {
                        //generates whole color name randomly
                        this.randomColor = this.cardsColorsData.CARDS_COLORS_NEUTRAL[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_NEUTRAL.length)];
                        return (this.randomColor);
                    };
                }
                TeacherComponent.prototype.getTests = function () {
                    var that = this;
                    this.http.get('/teacher/tests')
                        .toPromise()
                        .then(function (response) {
                        that.assignedTests = response.json();
                        console.log(that.assignedTests);
                    })
                        .catch(this.handleError);
                    return (this.assignedTests);
                };
                TeacherComponent.prototype.handleError = function (error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                TeacherComponent.prototype.checkTest = function () {
                    //this happens when teacher clicks CHECK button
                    this.selectedTest = this.assignedTests;
                    this.router.navigate(['/teacher/check_test', this.selectedTest.id]);
                };
                TeacherComponent.prototype.ngOnInit = function () {
                    this.getTests();
                };
                TeacherComponent = __decorate([
                    core_1.Component({
                        selector: 'teacher-component',
                        templateUrl: 'app/teacher/teacher-home.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [cards_colors_data_1.CardsColorsData]
                    }), 
                    __metadata('design:paramtypes', [cards_colors_data_1.CardsColorsData, http_1.Http, router_1.Router])
                ], TeacherComponent);
                return TeacherComponent;
            }());
            exports_1("TeacherComponent", TeacherComponent);
        }
    }
});
//# sourceMappingURL=teacher.component.js.map