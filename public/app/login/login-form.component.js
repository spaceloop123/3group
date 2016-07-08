"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var login_data_1 = require("./login.data");
var constants_data_1 = require("../constants/constants.data");
var LoginFormComponent = (function () {
    function LoginFormComponent() {
        this.constants = new constants_data_1.Constants();
        this.submitted = false;
        this.model = new login_data_1.LoginData('', '');
        this.active = true;
    }
    LoginFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
    };
    LoginFormComponent.prototype.showData = function (username, password) {
        console.log(username + '  ' + password);
    };
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            templateUrl: './app/login/login-form.component.html'
        })
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login-form.component.js.map