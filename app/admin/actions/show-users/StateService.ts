import {Injectable} from "@angular/core";

@Injectable()

export class StateService {
    static searchFilter:string = '';
    static fromDetail: boolean;
    static scrollPosition:number;
}