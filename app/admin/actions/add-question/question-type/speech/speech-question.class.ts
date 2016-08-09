import {QuestionBase} from "../question-base";

export class SpeechQuestion extends QuestionBase {

    constructor(difficulty, isSubQuestion) {
        super(difficulty, isSubQuestion);
        this.type = 'SpeechQuestion';
    }

}