import {AuthData} from "../common/auth/auth.data";

export class LoginData implements AuthData {
    constructor(public username:string,
                public usernameValid: boolean,
                public password:string,
                public submitAttempt: boolean) {
    }

    public clearForm() {
        this.password = '';
    }
}