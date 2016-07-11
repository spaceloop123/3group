System.register(["../user/runTest/runTest.component", "../user/ShowTests/showTests.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var runTest_component_1, showTests_component_1;
    var HomepageRoutes;
    return {
        setters: [
            function (runTest_component_1_1) {
                runTest_component_1 = runTest_component_1_1;
            },
            function (showTests_component_1_1) {
                showTests_component_1 = showTests_component_1_1;
            }],
        execute: function () {
            exports_1("HomepageRoutes", HomepageRoutes = [
                {
                    path: 'runTest',
                    component: runTest_component_1.RunTestComponent
                },
                {
                    path: 'showTests',
                    component: showTests_component_1.ShowTestsComponent
                }
            ]);
        }
    }
});
//# sourceMappingURL=homepage.routes.js.map