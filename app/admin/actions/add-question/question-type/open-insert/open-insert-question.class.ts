import {QuestionBase} from "../question-base";

export class OpenInsertQuestion extends QuestionBase {

    constructor() {
        super();
        this._answers = [{content: ''}, {content: ''}, {content: ''}];
    }

}