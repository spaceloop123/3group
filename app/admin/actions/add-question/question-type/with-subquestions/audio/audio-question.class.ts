import {WithSubQuestionsBase} from "../with-subquestions-base.class";

export class AudioQuestion extends WithSubQuestionsBase {

    action:any;
    path:string;

    constructor() {
        super('AudioQuestion', []);
        this.action = null;
        this.path = '';
    }

}