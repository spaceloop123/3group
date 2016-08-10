import {QuestionBase} from "../question-base";

export class InsertTestQuestion extends QuestionBase {
    private _correctAnswerIdx;

    constructor(difficulty, isSubQuestion) {
        super(difficulty, isSubQuestion);
        this.question = [{content: ''}, {content: ''}];
        this.answers = [{content: ''}, {content: ''}, {content: ''}];
        this.correctAnswerIdx = 1;
        this.type = 'InsertTestQuestion';
    }

    get correctAnswerIdx() {
        return this._correctAnswerIdx;
    }

    set correctAnswerIdx(value) {
        this._correctAnswerIdx = value;
    }
}