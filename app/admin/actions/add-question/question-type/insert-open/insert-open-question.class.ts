import {QuestionBase} from "../question-base";

export class InsertOpenQuestion extends QuestionBase {

    constructor(difficulty, isSubQuestion) {
        super(difficulty, isSubQuestion);
        this.question = [{content: ''}, {content: ''}];
        this.type = 'InsertOpenQuestion';
    }
}