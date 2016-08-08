import {Injectable} from "@angular/core";
import {CustomHttp} from "../../../../common/services/CustomHttp";

@Injectable()
export class AssignTestService {
    constructor(private customHttp:CustomHttp) {

    }

    getTeacherList() {
        return this.customHttp.get('/admin/teachers_list');
    }

    getUserInfoById(id) {
        return this.customHttp.post('/admin/user_list', id);
    }

    assignTest(user, teacher, data) {
        return this.customHttp.post('/admin/assign_test', this.prepareDate(user, teacher, data));
    }

    private prepareDate(user, teacher, data) {
        return {
            'userId': user,
            'teacherId': teacher['id'],
            'timeFrom': data.dateFrom,
            'timeTo': data.dateTo
        };
    }
}