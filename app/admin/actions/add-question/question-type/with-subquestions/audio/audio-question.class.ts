import {WithSubQuestionsBase} from "../with-subquestions-base.class";

export class AudioQuestion extends WithSubQuestionsBase {

    path:string;

    constructor() {
        super('AudioQuestion', []);
        this.path = '';
    }

}