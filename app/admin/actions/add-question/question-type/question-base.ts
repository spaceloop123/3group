import {GUID} from "../../../../common/guid/GUID";

// TODO: (pay attention) Do you really need use code like that in TS? All non custom get/set is on _id field so only it
// TODO: must be protected and decorated by custom setters getters.
export class QuestionBase {

    protected _id:string;
    protected _type:string;
    protected _state:string; //edit | done // TODO: (pay attention) That was fine idea to use enumeration instead of just string

    protected _header:string;
    protected _difficulty:number;
    protected _maxCost:number;
    protected _question:any;
    protected _answers:any;

    private _isSubQuestion:boolean;

    constructor(difficulty, isSubQuestion) {
        this.id = GUID.generate().toString();
        this.state = 'edit';
        this.difficulty = difficulty;
        this.isSubQuestion = isSubQuestion;
    }

    get id():string {
        return this._id;
    }

    set id(value:string) {
        this._id = value;
    }

    get state():string {
        return this._state;
    }

    set state(value:string) {
        this._state = value;
    }

    get type():string {
        return this._type;
    }

    set type(value:string) {
        this._type = value;
    }

    get header():string {
        return this._header;
    }

    set header(value:string) {
        this._header = value;
    }

    get difficulty():number {
        return this._difficulty;
    }

    set difficulty(value:number) {
        this._difficulty = value;
    }

    get maxCost():number {
        return this._maxCost;
    }

    set maxCost(value:number) {
        this._maxCost = value;
    }

    get question():any {
        return this._question;
    }

    set question(value:any) {
        this._question = value;
    }

    get answers():any {
        return this._answers;
    }

    set answers(value:any) {
        this._answers = value;
    }

    get isSubQuestion():boolean {
        return this._isSubQuestion;
    }

    set isSubQuestion(value:boolean) {
        this._isSubQuestion = value;
    }
}