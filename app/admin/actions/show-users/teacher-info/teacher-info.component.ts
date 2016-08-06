import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {CustomHttp} from "../../../../common/services/CustomHttp";
import {StateService} from "../StateService";

@Component({
    templateUrl: 'app/admin/actions/show-users/teacher-info/teacher-info.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [StateService]

})

export class TeacherInfoComponent implements OnInit {

    public currentUser:any;
    private sub;

    constructor(private route:ActivatedRoute,
                private customHttp:CustomHttp) {
    }

    ngOnInit() {
        StateService.fromDetail = true;
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.currentUser = params['id'];
            console.log('that.currentUser ' + that.currentUser);
        });
    }
}
