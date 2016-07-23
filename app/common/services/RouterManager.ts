import "rxjs/Rx";
import {NavigationError, Router, NavigationEnd} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class RouterManager {

    private sub;
    private href;
    private valignWrapper;

    constructor (private router: Router) {}

    RoutesErrorHandler() {
        this.sub = this.router.events.subscribe(event => {
            if(event instanceof NavigationError) {
                console.log('Handled that!');
                this.router.navigate(['/login']);
            }
        });
    }

    ValignWrapperCheck() {
        this.sub = this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.checkPath();
            }
        });
    }

    checkPath () {
        this.href = window.location.href;
        if (this.href == 'http://localhost:3000/#/login') {
            this.valignWrapper = 'valign-wrapper';
        }
        else {
            this.valignWrapper = '';
        }
        return this.valignWrapper;
    }

    destroySub() {
        this.sub.unsubscribe();
    }

}