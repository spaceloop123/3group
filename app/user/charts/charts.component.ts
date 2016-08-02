import {Component} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from "@angular/common";
import {Http} from "@angular/http";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";


@Component({
    selector: 'line-chart-demo',
    templateUrl: 'app/user/charts/lineChart.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ChartsComponent {
    private showTestsUrl = 'app/user/showTests';  // URL to web api

    lineChartData;

    constructor(private http:Http) {
        this.lineChartData =[ {
           // label: 15, //[],
            data: [50, 60, 50],//[],
            label: 'Result'
        }];

    }

/*
    getLineChartData() {
        var that = this;
        console.log("getLineChartData run");
        this.http.get(this.showTestsUrl)
            .toPromise()
            .then(response => this.lineChartData = response.json().data)
            .catch(this.handleError);
        //
    }
*/


    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }




    public lineChartLabels:Array<any> = ['20/04/2014', '20/04/2015', '20/04/2016'];
    public lineChartOptions:any = {
        animation: false,
        responsive: true,
        legend: {
            display: false
        }
    };
    public lineChartColours:Array<any> = [

        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            tension: 0,
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

