import {WithSubQuestionsBase} from "../with-subquestions-base.class";

export class ReadingQuestion extends WithSubQuestionsBase {

    private _text:string;

    constructor() {
        super('ReadingQuestion', []);
        this.text = '';
    }

    get text():string {
        return this._text;
    }

    set text(value:string) {
        this._text = value;
    }
}