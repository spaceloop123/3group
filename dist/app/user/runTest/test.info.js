System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TestInfo;
    return {
        setters:[],
        execute: function() {
            TestInfo = (function () {
                function TestInfo(time, numQuestions, id) {
                    this.time = time;
                    this.numQuestions = numQuestions;
                    this.id = id;
                }
                return TestInfo;
            }());
            exports_1("TestInfo", TestInfo);
        }
    }
});
//# sourceMappingURL=test.info.js.map