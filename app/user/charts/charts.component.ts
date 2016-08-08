import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from "@angular/common";
import {Http, Headers} from "@angular/http";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {TestStatistics} from "./test.statistics";
import {MaterializeDirective} from "angular2-materialize/dist/index";


@Component({
    selector: 'line-chart-demo',
    templateUrl: 'app/user/charts/lineChart.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES, MaterializeDirective]
})
export class ChartsComponent implements OnChanges {

    private showTestsUrl = 'app/user/showTests';
    @Input() role:string;
    @Input() userId:any;
    lineChartData;
    testsData:any[];
    lineChartLabels:any[];
    testStatistics:TestStatistics[];
    chart_style:string;
    info_style:string;


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

            if (changes['userId'].currentValue) {
                console.log('bla');
                this.userId = changes['userId'].currentValue;
                console.log('blabla');
            }
            this.getTestsHistory();
        }
    }


    getTestsHistory() {

        if (this.role === 'user') {
            this.getTestHistoryInUserMode();
            this.chart_style = 'col s12 m7 l7 offset-l1 charts-class';
            this.info_style = 'col s12 m5 l4 blue-grey-text charts-class';
        } else if (this.role === 'admin') {
            this.getTestHistoryInAdminMode();
            this.chart_style = 'col s12 m12 l12 charts-class';
            this.info_style = 'col s12 m12 l12 blue-grey-text';
        }


    }

    getTestHistoryInUserMode() {
        var that = this;
        this.http.get('/' + this.role + '/history')
            .toPromise()
            .then(response => that.initTestsHistory(response.json()))
            .catch(that.handleError);
    }

    getTestHistoryInAdminMode() {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post('/' + this.role + '/user_history',
                JSON.stringify({userId: that.userId}), {headers: header})
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
        return ((buffer.getMonth() + 1).toString() + '/' + (buffer.getDay() + 1).toString());

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
            if (this.role === 'user') {
                this.testHistoryInUserMode(index);
            } else if (this.role === 'admin') {
                this.testHistoryInAdminMode(index);
            }

        }
    }

    testHistoryInUserMode(index:number) {
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

    testHistoryInAdminMode(index:number) {
        var that = this;
        var header = new Headers();
        //console.log('that.testsData[index].testId} ' + that.testsData[index].testId);
        header.append('Content-Type', 'application/json');
        this.http
            .post('/' + this.role + '/test_history',
                JSON.stringify({userId: that.userId, testIds: that.testsData[index].tests}), {headers: header})
            .toPromise()
            .then(response => that.updateTestStatustics(response.json()))
            .catch(that.handleError);
    }

    public chartHovered(e:any):void {
        //console.log(e);
    }

    updateTestStatustics(response) {
        this.testStatistics = response.tests;

    }

    showTime(date:string):string {
        let time = new Date(date);
        return time.getHours().toString() + ':' + time.getMinutes().toString();
    }

    showMark(mark:number):string {
        return (Math.floor(mark * 100) / 100).toString();
    }


}
