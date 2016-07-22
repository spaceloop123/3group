System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TestsListData;
    return {
        setters:[],
        execute: function() {
            TestsListData = (function () {
                function TestsListData() {
                    //constructor(public assignedTests:string) {
                    //}
                    this.ASSIGNED_TESTS = [
                        {
                            name: 'Test1',
                            descr: 'descr1'
                        },
                        {
                            name: 'Test2',
                            descr: 'descr2'
                        },
                        {
                            name: 'Test3',
                            descr: 'descr3'
                        },
                        {
                            name: 'Test4',
                            descr: 'descr4'
                        },
                        {
                            name: 'Test5',
                            descr: 'descr5'
                        },
                        {
                            name: 'Test6',
                            descr: 'descr6'
                        }
                    ];
                }
                return TestsListData;
            }());
            exports_1("TestsListData", TestsListData);
        }
    }
});
//# sourceMappingURL=tests-list.data.js.map