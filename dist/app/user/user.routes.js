System.register(["../user/runTest/runTest.component", "../user/ShowTests/showTests.component", "./runTest/finish.page.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var runTest_component_1, showTests_component_1, finish_page_component_1;
    var UserRoutes;
    return {
        setters:[
            function (runTest_component_1_1) {
                runTest_component_1 = runTest_component_1_1;
            },
            function (showTests_component_1_1) {
                showTests_component_1 = showTests_component_1_1;
            },
            function (finish_page_component_1_1) {
                finish_page_component_1 = finish_page_component_1_1;
            }],
        execute: function() {
            exports_1("UserRoutes", UserRoutes = [
                {
                    path: 'runTest/:role',
                    component: runTest_component_1.RunTestComponent
                },
                {
                    path: 'finishTest/:role',
                    component: finish_page_component_1.FinishTestPageComponent
                },
                {
                    path: 'showTests',
                    component: showTests_component_1.ShowTestsComponent
                }
            ]);
        }
    }
});
//# sourceMappingURL=user.routes.js.map