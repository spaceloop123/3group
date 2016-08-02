import {WithSubQuestionsBase} from "../with-subquestions-base.class";

export class AudioQuestion extends WithSubQuestionsBase {

    private _path:string;

    constructor() {
        super('AudioQuestion', []);
        this.path = '';
    }

    get path():string {
        return this._path;
    }

    set path(value:string) {
        this._path = value;
    }
}