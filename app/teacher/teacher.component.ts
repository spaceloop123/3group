import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {CardsColorsData} from './cards-colors.data';

@Component({
    selector: 'teacher-component',
    templateUrl: 'app/teacher/teacher-home.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [CardsColorsData]
})

export class TeacherComponent implements OnInit {

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

    constructor(private cardsColorsData:CardsColorsData) {
    }

    private generateRandomColor = function () {
        this.randomColorLeft = this.cardsColorsData.CARDS_COLORS_LEFT[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_LEFT.length)];
        this.randomColorRight = this.cardsColorsData.CARDS_COLORS_RIGHT[Math.floor(Math.random() * this.cardsColorsData.CARDS_COLORS_RIGHT.length)];
        return (this.randomColorLeft + " " + this.randomColorRight);
    }
    //Without ng-repeat-----------------------------------------------------------------------------------

    private randomCol1 = this.generateRandomColor();
    private randomCol2 = this.generateRandomColor();
    private randomCol3 = this.generateRandomColor();
    private randomCol4 = this.generateRandomColor();
    private randomCol5 = this.generateRandomColor();
    private randomCol6 = this.generateRandomColor();

    ngOnInit() {
        console.log(this.randomCol1);
    }
}