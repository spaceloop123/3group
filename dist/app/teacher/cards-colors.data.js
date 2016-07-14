System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CardsColorsData;
    return {
        setters:[],
        execute: function() {
            CardsColorsData = (function () {
                function CardsColorsData() {
                    this.CARDS_COLORS_LEFT = [
                        'pink',
                        'indigo',
                        'blue',
                        'red',
                        'cyan',
                        'teal',
                        'green',
                        'lime',
                        'amber',
                        'yellow',
                        'orange'
                    ];
                    this.CARDS_COLORS_RIGHT = [
                        'darken-1',
                        'darken-2',
                        'darken-3',
                        'darken-4'
                    ];
                }
                return CardsColorsData;
            }());
            exports_1("CardsColorsData", CardsColorsData);
        }
    }
});
//# sourceMappingURL=cards-colors.data.js.map