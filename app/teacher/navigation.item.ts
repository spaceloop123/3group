export class NavigationItem{
    static UNCHECKED : number = 0;
    static CHECKED : number = 1;
    static NO_ANSWER : number = -1;


    constructor(public questionIndex: number,
                public subQuestionIndex: number,
                public status: number){
        
    }
    
    private show() :string{
        let result = (this.questionIndex).toString();
        if(this.subQuestionIndex !== null){
            result += String.fromCharCode(this.subQuestionIndex + 97);
        }
        return result;
    }
}