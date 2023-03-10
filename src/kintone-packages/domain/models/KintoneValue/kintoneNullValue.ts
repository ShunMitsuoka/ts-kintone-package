import { KintoneValue } from "./kintoneValue";

export class KintoneNullValue extends KintoneValue {

    public constructor(value : null){
        if (value !== null) {
            throw new Error("valueはnullである必要があります。");
        }
        super(value);
    }

    public getValue() : null{
        return this.value
    }
}