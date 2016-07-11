var QuestionInterface = {
    header: {type: String, required: true},
    difficulty: {type: Number},
    maxCost: {type: Number},
    dependent: {type: Boolean, required: true},
    type: {type: String, enum: ['test', 'open', 'reading', 'audition', 'speech', 'essay'], required: true}
};

module.exports.QuestionInterface = QuestionInterface;