export class Notification {

    private _notificationId:string;
    private _type:string;

    private _user:string;
    private _teacher:string;
    private _testId:string;

    private _color:string;
    private _icon:string;
    private _title:string;
    private _firstLine:string;
    private _secondLine:string;

    constructor(notification) {
        this.notificationId = notification['notificationId'];
        this.type = notification['type'];

        this.teacher = notification['teacher'];
        this.user = notification['user'];

        if (this.type === 'request') {
            this.testId = notification['testId'];
        }
    }

    get notificationId():string {
        return this._notificationId;
    }

    set notificationId(value:string) {
        this._notificationId = value;
    }

    get type():string {
        return this._type;
    }

    set type(value:string) {
        this._type = value;
        if (value === 'request') {
            this.color = 'red';
            this.icon = 'new_releases';
            this.title = 'Request';
        } else if (value === 'done') {
            this.color = 'green';
            this.icon = 'done';
            this.title = 'Done';
        }
    }

    get user():string {
        return this._user;
    }

    set user(value:string) {
        this._user = value;
        if (this.type === 'request') {
            this.firstLine = value + ' requested a test';
            this.secondLine = 'Assign/decline here';
        } else if (this.type === 'done') {
            this.firstLine = value + ' completed a test';
            this.secondLine = this.teacher + ' checked this test';
        }
    }

    get teacher():string {
        return this._teacher;
    }

    set teacher(value:string) {
        if (this.type === 'done') {
            this._teacher = value;
        }
    }

    get color():string {
        return this._color;
    }

    set color(value:string) {
        this._color = value;
    }

    get icon():string {
        return this._icon;
    }

    set icon(value:string) {
        this._icon = value;
    }

    get title():string {
        return this._title;
    }

    set title(value:string) {
        this._title = value;
    }

    get firstLine():string {
        return this._firstLine;
    }

    set firstLine(value:string) {
        this._firstLine = value;
    }

    get secondLine():string {
        return this._secondLine;
    }

    set secondLine(value:string) {
        this._secondLine = value;
    }

    get testId():string {
        return this._testId;
    }

    set testId(value:string) {
        this._testId = value;
    }
}