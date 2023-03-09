import { KintoneValue } from "./kintoneValue";

export class KintoneObjectValue extends KintoneValue {

    public constructor(value : Object){
        if (value instanceof Object) {
            super(value);
            return;
        }
        throw new Error("valueはObject型である必要があります。");
    }

    public getValue() : Object{
        return this.value
    }

    public isObject() : boolean{
        return true
    }
}