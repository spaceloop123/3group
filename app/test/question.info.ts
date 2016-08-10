export class QuestionInfo {
    constructor(public testId: string,
                public questionIndex: number,
                public subQuestions: string[],
                public answersId: any[]) {
    }

    hasSubQuestions() :boolean{
        if(this.subQuestions !== null){
            return this.subQuestions.length !== 0;
        }
        return false;
    }

    static fromJson(json : string){
        let parsed = JSON.parse(json);
        return parsed === null ? 
            null : new QuestionInfo(parsed.testId, parsed.questionIndex, parsed.subQuestions, parsed.answersId);
    }
}