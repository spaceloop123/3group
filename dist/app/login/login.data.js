System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LoginData;
    return {
        setters:[],
        execute: function() {
            LoginData = (function () {
                function LoginData(username, password) {
                    this.username = username;
                    this.password = password;
                }
                return LoginData;
            }());
            exports_1("LoginData", LoginData);
        }
    }
});
//# sourceMappingURL=login.data.js.map