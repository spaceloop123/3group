import {QuestionBase} from "../question-base";

export class TestQuestion extends QuestionBase {
    private _correctAnswerIdx;

    constructor(difficulty, isSubQuestion) {
        super(difficulty, isSubQuestion);
        this.answers = [{content: ''}, {content: ''}, {content: ''}];
        this.correctAnswerIdx = 1;
        this.type = 'TestQuestion';
    }

    get correctAnswerIdx() {
        return this._correctAnswerIdx;
    }

    set correctAnswerIdx(value) {
        this._correctAnswerIdx = value;
    }
}