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
}