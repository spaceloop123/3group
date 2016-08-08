import {Notification} from "./notifications.class";

export class NotificationActive extends Notification {
    state:string;
    teacherId;
    date;

    constructor(notification, state:string, teacherId, date) {
        super(notification);
        this.state = state;
        this.teacherId = teacherId;
        this.date = date;
    }
}