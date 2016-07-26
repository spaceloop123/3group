import {GUID} from "../../../../common/guid/GUID";

export class QuestionBase {
    protected _id:string;

    protected _header:string;
    protected _difficulty:number;
    protected _maxCost:number;
    protected _question:string;
    protected _answers:any;

    constructor() {
        this._id = GUID.generate().toString();
    }

    get id():string {
        return this._id;
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

    get question():string {
        return this._question;
    }

    set question(value:string) {
        this._question = value;
    }

    get answers():any {
        return this._answers;
    }

    set answers(value:any) {
        this._answers = value;
    }
}