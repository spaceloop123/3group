import {Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {MaterializeDirective, toast} from 'angular2-materialize'
import {TestInfo} from "./test.info";
import {QuestionInfo} from "./question.info";
import {SubQuestionsInfo} from "./subQuestions.info";

@Component({
    selector: 'display-test',
    templateUrl: 'app/user/runTest/test.html',
    directives: [REACTIVE_FORM_DIRECTIVES, MaterializeDirective]
})

export class TestComponent implements OnChanges {

    @Input() testInfo:TestInfo;
    @Output() progress = new EventEmitter<number>();
    question:any;
    top:any;
    subQuestion:any;
    questionInfo:QuestionInfo;
    subQuestionInfo: SubQuestionsInfo;
    myAudio:any;
    isPlayed:boolean;
    playCount:number;
    openAnswer:string;


    options:any[];
    answer: string;
    

    constructor(private http:Http) {
        this.options = new Array();
        this.isPlayed = false;
        this.top = {type: "nothing"};
        this.answer = '';
    }



    /*ngOnInit() {
        if(this.testInfo !== null) {
            this.questionInfo = this.restoreQuestionInfo();
            this.subQuestionInfo = this.restoreSubQuestionInfo();
            if(this.questionInfo === null){
                this.questionInfo = new QuestionInfo(this.testInfo.id, 1, null);
            }
            if(this.subQuestionInfo === null){
                this.subQuestionInfo = SubQuestionsInfo.empty(this.testInfo.id);
            }
            this.requestCurrentQuestion();
        }
    }*/

    ngOnChanges(changes:SimpleChanges):any {
        this.testInfo = changes['testInfo'].currentValue;
        if(this.testInfo !== null) {
            this.questionInfo = this.restoreQuestionInfo();
            this.subQuestionInfo = this.restoreSubQuestionInfo();
            if(this.questionInfo === null){
                this.questionInfo = new QuestionInfo(this.testInfo.id, 1, null);
            }
            if(this.subQuestionInfo === null){
                this.subQuestionInfo = SubQuestionsInfo.empty(this.testInfo.id);
            }
            this.requestCurrentQuestion();
            this.reportProgress();
        }
        return undefined;
    }

    requestCurrentQuestion(){
        if(this.questionInfo.hasSubQuestions() && !this.subQuestionInfo.onParent()){
            this.getSubQuestionFromServer(this.subQuestionInfo);
        }
        else {
            this.getQuestionFromServer(this.questionInfo);
        }
    }

    saveQuestionInfo(){
        localStorage.setItem('questionInfo', JSON.stringify(this.questionInfo));
    }

    restoreQuestionInfo() {
        return QuestionInfo.fromJson(localStorage.getItem('questionInfo'));
    }

    saveSubQuestionInfo(){
        localStorage.setItem('subQuestionInfo', JSON.stringify(this.subQuestionInfo));
    }

    restoreSubQuestionInfo() {
        return SubQuestionsInfo.fromJson(localStorage.getItem('subQuestionInfo'));
    }
    
    getQuestionFromServer(qInfo :QuestionInfo) {
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        console.log('qInfo.questionIndex ' + qInfo.questionIndex);
        console.log('qInfo.testId ' + qInfo.testId);
        this.http
            .post('/user/next_question',
                JSON.stringify({n: qInfo.questionIndex, testId: qInfo.testId}), {headers: header})
            .toPromise()
            .then(response => that.saveQuestionFromResponse(response.json()))
            .catch(that.handleError);
    }
    
    getSubQuestionFromServer(subQInfo :SubQuestionsInfo){
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post('/user/next_question_by_id',
                JSON.stringify({id: subQInfo.subQuestionId, testId: subQInfo.testId}), {headers: header})
            .toPromise()
            .then(response => that.saveSubQuestionFromResponse(response.json()))
            .catch(that.handleError);
    }
    
    grabAnswer() : string[]{
        let result = new Array();
        if(this.top.type === 'TestQuestion') {
            for(let index = 0; index < this.options.length; ++index){
                if(this.options[index].checked){
                    result.push(this.options[index].name);
                }
            }
        } else{
            result = new Array(this.answer);
            this.answer = '';
        }

        return result;
    }

    saveQuestionFromResponse(response) {
        this.question = response;
        if(this.question.subQuestions) {
            this.questionInfo.subQuestions = this.question.subQuestions;
            if(this.question.type === 'ReadingQuestion'){
                toast('You can read this text only once', 5000);
            }else if(this.question.type === 'AudioQuestion'){
                toast('You can listen this story twice', 5000);
            }
        }
        this.saveQuestionInfo();
        //if(this.questionInfo.hasSubQuestions()){
        //    
        //}
        this.subQuestionInfo = SubQuestionsInfo.empty(this.testInfo.id);
        this.saveSubQuestionInfo();
        this.processQuestion(this.question);
    }

    saveSubQuestionFromResponse(response) {
        this.subQuestion = response;
        this.processQuestion(this.subQuestion);
    }

    processQuestion(question){
        this.top = question;
        if(question.type === 'TestQuestion'){
            this.makeOptions();
        }else if(question.type === 'AudioQuestion'){
            this.myAudio = new Audio();
        }

    }

    changeCheckState(idx) {
        console.log(idx);
        console.log(this.options[idx].checked);
        this.answer = this.options[idx].name;
        console.log(this.answer);
       /* for(let i = 0; i < this.options.length; ++i){
            if(i != idx) {
                this.options[i].checked = false;
            }
        }*/
    }

    makeOptions(){
        this.options = [];
        for (let index = 0; index < this.top.answers.length; ++index) {
            console.log('answer' + this.top.answers[index]);
            this.options.push({name: this.top.answers[index], checked: false});
        }

    }

    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    playAydio() {
        if (!this.isPlayed) {

            this.myAudio.src = "http://vignette4.wikia.nocookie.net/starwars/images/f/f5/A_little_short.ogg/revision/latest?cb=20090519125603";
            this.myAudio.load();
            this.isPlayed = true;
            this.playCount = 0;
        }

        if (this.playCount < 2 && this.myAudio.paused) {
            this.myAudio.play();
            var that = this;
            this.myAudio.addEventListener("ended", () => that.playCount += 1);
        }

        if (this.playCount >= 2) {
            console.log('Your have spent all of the attempts!');
            toast('Sorry. Your have spent all of the attempts!', 2000, 'rounded')
        }
    }

    public sendAnswer(callBack){
        this.sendAnswerToServer(this.answer, callBack);
    }

    sendAnswerToServer(answer : string, callBack){
        var that = this;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http
            .post('/user/answer',
                JSON.stringify({test: that.testInfo.id, question: that.top.id, answer: answer}), {headers: header})
            .toPromise()
            .then(response => {console.log(response); callBack();})
            .catch(that.handleError);



    }

    goToNextQuestion() :boolean{
        this.subQuestionInfo = SubQuestionsInfo.empty(this.testInfo.id);
        this.questionInfo.questionIndex += 1;
        this.questionInfo.subQuestions = null;
        return (this.questionInfo.questionIndex <= this.testInfo.numQuestions);
    }

    goToNextSubQuestion() :boolean{
        if(this.subQuestionInfo.onParent()){
            this.subQuestionInfo.subQuestionIndex = 1;
            this.subQuestionInfo.subQuestionId = this.questionInfo.subQuestions[0];
            return true;
        }
        else{
            this.subQuestionInfo.subQuestionIndex += 1;
            if(this.subQuestionInfo.subQuestionIndex > this.questionInfo.subQuestions.length){
                return false;
            }
            else{
                this.subQuestionInfo.subQuestionId =
                    this.questionInfo.subQuestions[this.subQuestionInfo.subQuestionIndex - 1];
                return true;
            }
        }
    }

    goForward() :boolean{
        let canGo = true;
        if(this.questionInfo.hasSubQuestions()){
            if(!this.goToNextSubQuestion()){
                canGo = this.goToNextQuestion();
            }
        }
        else{
            canGo = this.goToNextQuestion();
        }
        this.saveQuestionInfo();
        this.saveSubQuestionInfo();
        if(canGo){
            this.requestCurrentQuestion();
        }
        this.reportProgress();
        return canGo;
    }
    
    reportProgress(){
        console.log("Progress report");
        this.progress.emit((this.questionInfo.questionIndex - 1) * 100 / this.testInfo.numQuestions);
    }

    getClassForAnswer(answer : string){
        return answer === "" ? "invalid-answer" : "valid-answer";
    }
}