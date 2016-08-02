import {Injectable} from "@angular/core";
import {CustomHttp} from "../../../common/services/CustomHttp";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Injectable()
export class NotificationsService {
    constructor(private customHttp:CustomHttp) {

    }

    getData():any {
        return IntervalObservable.create(5000)
            .flatMap(() => {
                return this.customHttp.get('/admin/notifications')
            })
            .subscribe(responce => {
                console.log('Responce = ' + responce);
            }, error => {
                console.log('Error in Notififcation Service');
            });
    }
}