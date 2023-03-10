import { KintoneValue } from "./kintoneValue";

export class KintoneArrayValue extends KintoneValue {

    public constructor(value : Array<string>){
        if (!Array.isArray(value)) {
            throw new Error("valueはArray型である必要があります。");
        }
        super(value);
    }

    public getValue() : Array<string>{
        return this.value
    }

    public isArray() : boolean{
        return true
    }
}