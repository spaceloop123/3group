System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TestData;
    return {
        setters:[],
        execute: function() {
            TestData = (function () {
                function TestData(type, options, audio) {
                    this.type = type;
                    this.options = options;
                    this.audio = audio;
                }
                return TestData;
            }());
            exports_1("TestData", TestData);
        }
    }
});
//# sourceMappingURL=test.data.component.js.map