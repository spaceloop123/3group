export class TestQuestion {
    private _header:string;
    private _difficulty:number;
    private _maxCost:number;
    private _question:string;
    private _answers:any;
    private _correctAnswerIdx:number;

    constructor() {
        this._answers = [{content: ''}, {content: ''}, {content: ''}];
        this._correctAnswerIdx = 0;
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

    get correctAnswerIdx():number {
        return this._correctAnswerIdx;
    }

    set correctAnswerIdx(value:number) {
        this._correctAnswerIdx = value;
    }
}