import {QuestionBase} from "../question-base";

export class WithSubQuestionsBase extends QuestionBase {

    private _subQuestions:any[];

    constructor(type:string, subQuestions:any[]) {
        super();
        this.type = type;
        this.subQuestions = subQuestions;
    }

    get subQuestions():any[] {
        return this._subQuestions;
    }

    set subQuestions(value:Array<any>) {
        this._subQuestions = value;
    }

}