import {QuestionBase} from "../question-base";

export class TestQuestion extends QuestionBase {
    private _type:string;
    private _correctAnswerIdx;

    constructor() {
        super();
        this._answers = [{content: ''}, {content: ''}, {content: ''}];
        this._correctAnswerIdx = 0;
        this._type = 'test';
    }

    get type():string {
        return this._type;
    }

    set type(value:string) {
        this._type = value;
    }

    get correctAnswerIdx() {
        return this._correctAnswerIdx;
    }

    set correctAnswerIdx(value) {
        this._correctAnswerIdx = value;
    }
}