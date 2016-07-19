System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var QuestionData;
    return {
        setters:[],
        execute: function() {
            QuestionData = (function () {
                function QuestionData(header, type, question, options, questionParts, subQuestions, audio, answer, isPlayed, id) {
                    this.header = header;
                    this.type = type;
                    this.question = question;
                    this.options = options;
                    this.questionParts = questionParts;
                    this.subQuestions = subQuestions;
                    this.audio = audio;
                    this.answer = answer;
                    this.isPlayed = isPlayed;
                    this.id = id;
                }
                return QuestionData;
            }());
            exports_1("QuestionData", QuestionData);
        }
    }
});
//# sourceMappingURL=question.data.js.map