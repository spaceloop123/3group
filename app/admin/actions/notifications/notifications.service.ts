import {Injectable} from "@angular/core";
import {CustomHttp} from "../../../common/services/CustomHttp";
import {Observable} from "rxjs/Rx";

@Injectable()
export class NotificationsService {
    constructor(private customHttp:CustomHttp) {

    }

    getData():any {
        return Observable.interval(2000)
            .flatMap(() => {
                return this.customHttp.get('/admin/notifications')
            });
    }
}