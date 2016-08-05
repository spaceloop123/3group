import {Notification} from "./notifications.class";

export class NotificationActive extends Notification {
    private _state:string;

    constructor(notification, state:string) {
        super(notification);
        this._state = state;
    }

    get state():string {
        return this._state;
    }

    set state(value:string) {
        this._state = value;
    }
}