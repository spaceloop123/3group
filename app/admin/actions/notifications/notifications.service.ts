import {Injectable} from "@angular/core";
import {CustomHttp} from "../../../common/services/CustomHttp";

@Injectable()
export class NotificationsService {
    constructor(private customHttp:CustomHttp) {

    }

    getData(url):any {
        let resp;
        this.customHttp.get('/admin/notifications')
            .subscribe(responce => {
                resp = responce;
            }, error => {
                resp = {'test': 123};
            });
        return resp;
    }
}