export class Notification {

    notificationId:string;
    _type:string;

    _user:string;
    userId:string;
    _teacher:string;
    testId:string;

    idx:number;

    color:string;
    icon:string;
    title:string;
    firstLine:string;
    secondLine:string;

    constructor(notification) {
        this.notificationId = notification['notificationId'];
        this.type = notification['type'];

        this.teacher = notification['teacher'];
        this.user = notification['user'];

        this.userId = notification['userId'];

        if (this.type === 'request') {
            this.testId = notification['testId'];
        }
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
}