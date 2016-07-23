System.register(['./teacher/teacher-checking.component', "@angular/router", "./login/login.component", "./teacher/teacher.component", "./user/user.component", "./admin/admin.component", "./user/user.routes", "./user/charts/charts.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var teacher_checking_component_1, router_1, login_component_1, teacher_component_1, user_component_1, admin_component_1, user_routes_1, charts_component_1;
    var routes, APP_ROUTER_PROVIDERS;
    return {
        setters:[
            function (teacher_checking_component_1_1) {
                teacher_checking_component_1 = teacher_checking_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (teacher_component_1_1) {
                teacher_component_1 = teacher_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (user_routes_1_1) {
                user_routes_1 = user_routes_1_1;
            },
            function (charts_component_1_1) {
                charts_component_1 = charts_component_1_1;
            }],
        execute: function() {
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
                    redirectTo: '/home',
                    pathMatch: 'full'
                },
                {
                    path: 'home',
                    component: user_component_1.UserComponent
                },
                {
                    path: 'user/charts',
                    component: charts_component_1.ChartsComponent
                }
            ].concat(user_routes_1.UserRoutes);
            exports_1("APP_ROUTER_PROVIDERS", APP_ROUTER_PROVIDERS = [
                router_1.provideRouter(routes)
            ]);
        }
    }
});
//# sourceMappingURL=app.routes.user.js.map