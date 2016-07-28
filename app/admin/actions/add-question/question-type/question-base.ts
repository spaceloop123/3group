import {GUID} from "../../../../common/guid/GUID";

export class QuestionBase {
    private _id:string;
    protected _type:string;
    protected _state:string; //edit | done

    protected _header:string;
    protected _difficulty:number;
    protected _maxCost:number;
    protected _question:any;
    protected _answers:any;

    constructor() {
        this.id = GUID.generate().toString();
        this.state = 'edit';
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
}