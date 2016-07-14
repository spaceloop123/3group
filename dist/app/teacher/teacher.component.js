System.register(['@angular/core', "@angular/router", './cards-colors.data'], function(exports_1, context_1) {
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
    var core_1, router_1, cards_colors_data_1;
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
            }],
        execute: function() {
            TeacherComponent = (function () {
                /*
                 constructor(private testsImg:TestsImgData) {}
            
                 private randomImg1 = this.testsImg.TESTS_IMG[Math.floor(Math.random()*this.testsImg.TESTS_IMG.length)];
            
                 //Without ng-repeat-----------------------------------------------------------------------------------
            
                 private randomImg2 = this.testsImg.TESTS_IMG[Math.floor(Math.random()*this.testsImg.TESTS_IMG.length)];
                 private randomImg3 = this.testsImg.TESTS_IMG[Math.floor(Math.random()*this.testsImg.TESTS_IMG.length)];
                 private randomImg4 = this.testsImg.TESTS_IMG[Math.floor(Math.random()*this.testsImg.TESTS_IMG.length)];
                 private randomImg5 = this.testsImg.TESTS_IMG[Math.floor(Math.random()*this.testsImg.TESTS_IMG.length)];
                 private randomImg6 = this.testsImg.TESTS_IMG[Math.floor(Math.random()*this.testsImg.TESTS_IMG.length)];
                 */
                function TeacherComponent(cardsColorsData) {
                    this.cardsColorsData = cardsColorsData;
                    this.generateRandomColor = function () {
                        this.randomColorLeft = this.cardsColorsData.CARDS_COLORS_LEFT[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_LEFT.length)];
                        this.randomColorRight = this.cardsColorsData.CARDS_COLORS_RIGHT[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_RIGHT.length)];
                        return (this.randomColorLeft + " " + this.randomColorRight);
                    };
                    //Without ng-repeat-----------------------------------------------------------------------------------
                    this.randomCol1 = this.generateRandomColor();
                    this.randomCol2 = this.generateRandomColor();
                    this.randomCol3 = this.generateRandomColor();
                    this.randomCol4 = this.generateRandomColor();
                    this.randomCol5 = this.generateRandomColor();
                    this.randomCol6 = this.generateRandomColor();
                }
                TeacherComponent.prototype.ngOnInit = function () {
                    console.log(this.randomCol1);
                };
                TeacherComponent = __decorate([
                    core_1.Component({
                        selector: 'teacher-component',
                        templateUrl: 'app/teacher/teacher-home.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [cards_colors_data_1.CardsColorsData]
                    }), 
                    __metadata('design:paramtypes', [cards_colors_data_1.CardsColorsData])
                ], TeacherComponent);
                return TeacherComponent;
            }());
            exports_1("TeacherComponent", TeacherComponent);
        }
    }
});
//# sourceMappingURL=teacher.component.js.map