import {Notification} from "./notifications.class";

export class NotificationActive extends Notification {
    state:string;

    constructor(notification, state:string) {
        super(notification);
        this.state = state;
    }
}