export class QuestionData {
    constructor(public header:string,
                public type:string,
                public options: string[],
                public questionParts:string[],
                public subQuestions: any[]) {
    }
}