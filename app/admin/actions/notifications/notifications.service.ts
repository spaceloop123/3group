import {Injectable} from "@angular/core";
import {CustomHttp} from "../../../common/services/CustomHttp";
import {Observable} from "rxjs/Rx";
import {NotificationActive} from "./notification.active.class";

@Injectable()
export class NotificationsService {
    constructor(private customHttp:CustomHttp) {

    }

    getData():any {
        return Observable.timer(0, 3000)
            .flatMap(() => {
                return this.customHttp.get('/admin/notifications')
            });
    }

    declineNotification(notification:NotificationActive):any {
        return this.customHttp.post('/admin/decline_request_notification', this.prepareNotification(notification));
    }

    private prepareNotification(notification:NotificationActive) {
        return {'notificationId': notification.notificationId, 'testId': notification.testId};
    }
}