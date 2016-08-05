import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from "@angular/common";
import {Http, Headers} from "@angular/http";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {TestStatistics} from "./test.statistics";


@Component({
    selector: 'line-chart-demo',
    templateUrl: 'app/user/charts/lineChart.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ChartsComponent implements OnChanges {

    private showTestsUrl = 'app/user/showTests';
    @Input() role:string;
    lineChartData;
    testsData:any[];
    lineChartLabels:any[];
    testStatistics:TestStatistics[];


    constructor(private http:Http) {
        this.lineChartData =[ {
            data: []
        }];
        this.lineChartLabels = new Array();
        this.testStatistics = new Array();

    }

    ngOnChanges(changes:SimpleChanges):any {
        if (changes['role'].currentValue) {
            this.role = changes['role'].currentValue;
            this.getTestsHistory();
        }
    }


    getTestsHistory() {
        var that = this;
        this.http.get('/' + this.role + '/history')
            .toPromise()
            .then(response => that.initTestsHistory(response.json()))
            .catch(that.handleError);

    }

    initTestsHistory(response:any) {
        this.testsData = response.nodes;
        // date, tests[], mark
        this.processTestData();

    }


    processTestData() {
        console.log(this.testsData);
        console.log('aaa');

        for (let item of this.testsData) {
            this.lineChartData[0].data.push(item.mark);
            this.lineChartLabels.push(this.parseDate(item.date));

        }
    }

    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


    parseDate(date:string):string {
        let buffer = new Date(date);
        return (buffer.getMonth() + '/' + buffer.getDay());

    }


    public lineChartOptions:any = {
        animation: false,
        responsive: true,
        legend: {
            display: false
        }
    };
    public lineChartColours:Array<any> = [

        {
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
        if (e.active[0]) {
            //console.log(e.active[0]._index);
            let index = e.active[0]._index;
            var that = this;
            var header = new Headers();
            //console.log('that.testsData[index].testId} ' + that.testsData[index].testId);
            header.append('Content-Type', 'application/json');
            this.http
                .post('/' + this.role + '/test_history',
                    JSON.stringify({testIds: that.testsData[index].tests}), {headers: header})
                .toPromise()
                .then(response => that.updateTestStatustics(response.json()))
                .catch(that.handleError);
        }
    }

    public chartHovered(e:any):void {
        //console.log(e);
    }

    updateTestStatustics(response) {
        this.testStatistics = response.tests;
        
    }


}
