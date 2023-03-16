import { KintoneValue } from "./kintoneValue";

export class KintoneSingleValue extends KintoneValue {

    public constructor(value : string){
        if (typeof value !== "string") {
            throw new Error("valueはstring型である必要があります。");
        }
        super(value);
    }

    public getValue() : string{
        return this.value
    }

    static checkSingleValue(value : any) : boolean{
        return typeof value === "string" || value instanceof String
    }
}