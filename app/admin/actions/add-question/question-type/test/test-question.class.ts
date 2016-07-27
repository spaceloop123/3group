import {QuestionBase} from "../question-base";

export class TestQuestion extends QuestionBase {
    private _correctAnswerIdx;

    constructor() {
        super();
        this._answers = [{content: ''}, {content: ''}, {content: ''}];
        this._correctAnswerIdx = 1;
        this._type = 'test';
    }

    get correctAnswerIdx() {
        return this._correctAnswerIdx;
    }

    set correctAnswerIdx(value) {
        this._correctAnswerIdx = value;
    }
}