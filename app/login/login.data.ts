export class LoginData {
    constructor(public username:string,
                public usernameValid: boolean,
                public password:string,
                public submitAttempt: boolean) {
    }
}