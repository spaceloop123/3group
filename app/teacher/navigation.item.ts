export class NavigationItem{
    constructor(public questionIndex: number,
                public subQuestionIndex: number){
        
    }
    
    private show() :string{
        let result = (this.questionIndex).toString();
        if(this.subQuestionIndex !== null){
            result += String.fromCharCode(this.subQuestionIndex + 97);
        }
        return result;
    }
}