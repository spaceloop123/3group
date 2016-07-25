import "rxjs/Rx";
import {NavigationError, Router, NavigationEnd} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class RouterManager {

    private sub;
    
    constructor (private router: Router) {}

    RoutesErrorHandler() {
        this.sub = this.router.events.subscribe(event => {
            if(event instanceof NavigationError) {
                console.log('Handled that!');
                this.router.navigate(['/login']);
            }
        });
    }

}