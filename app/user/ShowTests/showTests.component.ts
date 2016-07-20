import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {AuthService} from '../../common/auth/auth.service';
import {Http} from "@angular/http";

@Component({
    templateUrl: 'app/user/showTests.html',
    providers: [AuthService]
})

export class ShowTestsComponent implements OnInit {

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.auth.checkAuth();
    }
}
