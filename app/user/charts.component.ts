import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';

import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';



@Component({
    selector: 'line-chart-demo',
    templateUrl: 'app/user/lineChart.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class LineChartDemoComponent {




    // lineChart
       public lineChartData:Array<any> = [
      //  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [150,160,150], label: 'Series A'},
    ];
    //public lineChartLabels:Array<any> = ['Header', 'Result', 'Date'];
    public lineChartLabels:Array<any> = ['20/04/2014', '20/04/2015', '20/04/2016'];
    public lineChartOptions:any = {
        animation: false,
        responsive: true,
        legend: {
            display: false}
    };
    public lineChartColours:Array<any> = [

        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            tension:0,
            fill: false,


        }
    ];

    public lineChartType:string = 'line';



    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    /*getData() {
        return  this.http.get('/' + status + '/availtest')
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);*/
    }



/*

 import { Injectable }    from '@angular/core';
 import { Headers, Http } from '@angular/http';
 import 'rxjs/add/operator/toPromise';
 import { Hero } from './hero';
 @Injectable()
 export class HeroService {
 private heroesUrl = 'app/heroes';  // URL to web api
 constructor(private http: Http) { }
 getHeroes() {
 return this.http.get(this.heroesUrl)
 .toPromise()
 .then(response => response.json().data as Hero[])
 .catch(this.handleError);
 }
 getHero(id: number) {
 return this.getHeroes()
 .then(heroes => heroes.find(hero => hero.id === id));
 }
 save(hero: Hero): Promise<Hero>  {
 if (hero.id) {
 return this.put(hero);
 }
 return this.post(hero);
 }
 delete(hero: Hero) {
 let headers = new Headers();
 headers.append('Content-Type', 'application/json');
 let url = `${this.heroesUrl}/${hero.id}`;
 return this.http
 .delete(url, {headers: headers})
 .toPromise()
 .catch(this.handleError);
 }
 // Add new Hero
 private post(hero: Hero): Promise<Hero> {
 let headers = new Headers({
 'Content-Type': 'application/json'});
 return this.http
 .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
 .toPromise()
 .then(res => res.json().data)
 .catch(this.handleError);
 }
 // Update existing Hero
 private put(hero: Hero) {
 let headers = new Headers();
 headers.append('Content-Type', 'application/json');
 let url = `${this.heroesUrl}/${hero.id}`;
 return this.http
 .put(url, JSON.stringify(hero), {headers: headers})
 .toPromise()
 .then(() => hero)
 .catch(this.handleError);
 }
 private handleError(error: any) {
 console.error('An error occurred', error);
 return Promise.reject(error.message || error);
 }
 }


*/
