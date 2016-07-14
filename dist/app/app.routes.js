System.register(["@angular/router", "./login/login.component", "./homepage/homepage.component", "./homepage/homepage.routes"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, login_component_1, homepage_component_1, homepage_routes_1;
    var routes, APP_ROUTER_PROVIDERS;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (homepage_component_1_1) {
                homepage_component_1 = homepage_component_1_1;
            },
            function (homepage_routes_1_1) {
                homepage_routes_1 = homepage_routes_1_1;
            }],
        execute: function () {
            routes = [
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
            exports_1("APP_ROUTER_PROVIDERS", APP_ROUTER_PROVIDERS = [
                router_1.provideRouter(routes)
            ]);
        }
    }
});
//# sourceMappingURL=app.routes.js.map