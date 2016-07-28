import {QuestionBase} from "../question-base";

export class InsertOpenQuestion extends QuestionBase {

    constructor() {
        super();

        this.question = [{content: ''}, {content: ''}];
        this.type = 'InsertOpenQuestion';
    }
}