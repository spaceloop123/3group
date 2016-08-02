export class SubQuestionsInfo {
    constructor(public testId:string,
                public subQuestionIndex: number,
                public subQuestionId: string) {
    }

    onParent() :boolean{
        if(this.subQuestionIndex !== null){
            return this.subQuestionIndex == -1;
        }
        return true;
    }

    static empty(testId :string) {
        return new SubQuestionsInfo(testId, -1, null);
    }

    static fromJson(json : string){
        let parsed = JSON.parse(json);
        return parsed === null ? null : new SubQuestionsInfo(parsed.testId, parsed.subQuestionIndex, parsed.subQuestionId);
    }
}