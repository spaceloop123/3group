"use strict";
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var homepage_component_1 = require("./homepage/homepage.component");
var homepage_routes_1 = require("./homepage/homepage.routes");
var routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'logo',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'homepage/:status',
        component: homepage_component_1.HomepageComponent
    }
].concat(homepage_routes_1.HomepageRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map