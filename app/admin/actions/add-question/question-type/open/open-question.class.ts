import {QuestionBase} from "../question-base";

export class OpenQuestion extends QuestionBase {

    constructor(difficulty, isSubQuestion) {
        super(difficulty, isSubQuestion);
        this.type = 'OpenQuestion';
    }

}